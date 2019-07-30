import { Percent } from 'model/percent';
import { remainder } from 'service/amortization';

import { FutureData } from '../model/future-data';
import { HomeData } from '../model/home-data';
import { InvestmentData } from '../model/investment-data';

export const toFraction = (num: number): number => {
  return num / 100;
};

export const percentage = (amount: number, rate: Percent): number => {
  return amount * toFraction(rate);
};

export const compound = (
  amount: number,
  rate: Percent,
  years: number,
): number => {
  return amount * Math.pow(1 + toFraction(rate), years);
};

export const monthsToNow = (date: string): number => {
  return Math.floor(
    (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 30),
  );
};

const mortgageDebt = (homeData: HomeData, yearsToFI: number): number => {
  const { price, downpayment, rate, purchaseDate, term } = homeData;
  const passedPeriods = monthsToNow(purchaseDate);
  const downpaymentAmount = percentage(price, downpayment);
  const loan = price - downpaymentAmount;
  const rateFraction = toFraction(rate / 12);
  const periods = term * 12;
  const period = yearsToFI * 12 + passedPeriods;

  return Math.max(0, remainder(loan, periods, rateFraction, period));
};

const monthlyHomeCosts = (
  price: number,
  maintenance: Percent,
  propertyTax: Percent,
): number => {
  return (
    percentage(price, maintenance) / 12 + percentage(price, propertyTax) / 12
  );
};

export const investment = (
  investmentData: InvestmentData,
  futureData: FutureData,
  years: number,
): number => {
  const { ror, savings, networth } = investmentData;
  const { inflation } = futureData;
  const currentNetworth = networth || 0;
  const rorFraction = 1 + toFraction(ror);
  const annualSavings = savings * 12;
  const inflationFraction = 1 + toFraction(inflation);
  const factor = rorFraction / inflationFraction;
  const futureSavings = annualSavings * Math.pow(inflationFraction, years);
  const futureNetworth = currentNetworth * Math.pow(rorFraction, years);

  const f1 = 1 - Math.pow(factor, years + 1);
  const f2 = 1 - factor;

  if (inflationFraction === rorFraction) {
    return Math.floor(
      (futureSavings / inflationFraction) * years + futureNetworth,
    );
  } else {
    return Math.floor(futureSavings * (f1 / f2) + futureNetworth) + 1;
  }
};

export const calcLiquidNetworth = (
  investmentData: InvestmentData,
  homeData: HomeData,
  futureData: FutureData,
  years: number,
): number => {
  return (
    investment(investmentData, futureData, years) -
    mortgageDebt(homeData, years)
  );
};

const monthlyYield = (networth: number, withdrawl: Percent): number => {
  return Math.floor(percentage(networth, withdrawl) / 12);
};

const monthlyLiquidYield = (networth: number, withdrawl: Percent): number => {
  return Math.floor(percentage(networth, withdrawl) / 12);
};

const increment = 0.25;

function calcRenter(
  investmentData: InvestmentData,
  homeData: HomeData,
  futureData: FutureData,
  year: number,
): number {
  const { rental } = homeData;
  const { livingExpenses, withdrawl, inflation } = futureData;
  const networth = investment(investmentData, futureData, year);

  const renterYield = monthlyYield(networth, withdrawl);
  const renterGoal = compound(livingExpenses + rental, inflation, year);

  return renterYield > renterGoal + 100 || year === 45
    ? year
    : calcRenter(investmentData, homeData, futureData, year + increment);
}

function calcHomeOwner(
  investmentData: InvestmentData,
  homeData: HomeData,
  futureData: FutureData,
  year: number,
  cb: (
    investmentData: InvestmentData,
    homeData: HomeData,
    futureData: FutureData,
    year: number,
  ) => number,
) {
  const { price, maintenance, propertyTax } = homeData;
  const { livingExpenses, withdrawl, inflation } = futureData;

  const liquidNetworth = calcLiquidNetworth(
    investmentData,
    homeData,
    futureData,
    year,
  );
  const expenses =
    livingExpenses + monthlyHomeCosts(price, maintenance, propertyTax);
  const homeownerYield = monthlyLiquidYield(liquidNetworth, withdrawl);
  const homeownerGoal = compound(expenses, inflation, year);

  return homeownerYield > homeownerGoal + 100 || year === 45
    ? year
    : cb(investmentData, homeData, futureData, year + increment);
}

function calcPayoffAtFI(
  investmentData: InvestmentData,
  homeData: HomeData,
  futureData: FutureData,
  year: number,
): number {
  return calcHomeOwner(
    investmentData,
    homeData,
    futureData,
    year,
    calcPayoffAtFI,
  );
}

function calcEarlyPayoff(
  investmentData: InvestmentData,
  homeData: HomeData,
  futureData: FutureData,
  year: number,
): number {
  const { price, maintenance, propertyTax } = homeData;
  const debt = mortgageDebt(homeData, year);
  const investments = investment(investmentData, futureData, year);

  if (investments > debt) {
    return calcRenter(
      {
        ...investmentData,
        networth: investments - debt,
      },
      {
        ...homeData,
        rental: monthlyHomeCosts(price, maintenance, propertyTax),
      },
      futureData,
      year,
    );
  } else {
    return calcHomeOwner(
      investmentData,
      homeData,
      futureData,
      year,
      calcEarlyPayoff,
    );
  }
}

export const effai = (
  investmentData: InvestmentData,
  homeData: HomeData,
  futureData: FutureData,
) => {
  return {
    renter: calcRenter(investmentData, homeData, futureData, 0),
    homeOwner: calcPayoffAtFI(investmentData, homeData, futureData, 0),
    earlyPayoff: calcEarlyPayoff(investmentData, homeData, futureData, 0),
  };
};

export const years = (
  investmentData: InvestmentData,
  homeData: HomeData,
  futureData: FutureData,
): number => {
  const { renter, homeOwner, earlyPayoff } = effai(
    investmentData,
    homeData,
    futureData,
  );

  return Math.min(renter, homeOwner, earlyPayoff);
};
