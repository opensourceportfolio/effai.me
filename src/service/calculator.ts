
import { NumberLike } from 'model/number-like';
import { FormInputs } from 'model/state';
import { memoizeWith } from 'ramda';
import { remainder } from 'service/amortization';

export const toFraction = (num: NumberLike): number => {
  return parseFloat(num) / 100;
};

export const percentage = (amount: NumberLike, rate: NumberLike): number => {
  return parseFloat(amount) * toFraction(rate);
};

export const compound = (
  amount: NumberLike,
  rate: NumberLike,
  yrs: NumberLike,
): number => {
  return parseFloat(amount) * Math.pow(1 + toFraction(rate), parseFloat(yrs));
};

export const monthsToNow = (date: string): number => {
  return Math.floor((Date.now() - new Date(date)) / (1000 * 60 * 60 * 24 * 30));
};

const mortgageDebt = (state: FormInputs, yrs: NumberLike): number => {
  const { price, downpayment, rate, purchaseDate, term } = state;
  const passedPeriods = monthsToNow(purchaseDate);
  const downpaymentAmount = percentage(price, downpayment);
  const loan = parseFloat(price) - downpaymentAmount;
  const rateFraction = toFraction(parseFloat(rate) / 12);
  const periods = parseFloat(term) * 12;
  const year = parseInt(yrs);
  const period = year * 12 + passedPeriods;

  return Math.max(0, remainder(loan, periods, rateFraction, period));
};

const homeEquity = (state: FormInputs, yrs: NumberLike): number => {
  const { price, houseGrowth } = state;
  const value = compound(parseFloat(price), parseFloat(houseGrowth), yrs);
  const remaining = mortgageDebt(state, yrs) || 0;

  return state.isHomeOwner ? value - remaining : 0;
};

const monthlyHomeCosts = (state: FormInputs): number => {
  return (
    percentage(state.price, state.maintenance) / 12 +
    percentage(state.price, state.propertyTax) / 12
  );
};

export const investment = (state: FormInputs, yrs: number): number => {
  const { ror, savings, inflation, networth } = state;
  const currentNetworth = parseInt(networth) || 0;
  const rorFraction = 1 + toFraction(ror);
  const annualSavings = parseFloat(savings) * 12;
  const inflationFraction = 1 + toFraction(inflation);
  const factor = rorFraction / inflationFraction;
  const futureSavings = annualSavings * Math.pow(inflationFraction, yrs);
  const futureNetworth = currentNetworth * Math.pow(rorFraction, yrs);

  const f1 = 1 - Math.pow(factor, yrs + 1);
  const f2 = 1 - factor;

  if (inflationFraction === rorFraction) {
    return Math.floor(
      (futureSavings / inflationFraction) * yrs + futureNetworth,
    );
  } else {
    return Math.floor(futureSavings * (f1 / f2) + futureNetworth) + 1;
  }
};

export const totalNetworth = (state: FormInputs, yrs: number): number => {
  return investment(state, yrs) + homeEquity(state, yrs);
};

const liquidNetworth = (state: FormInputs, yrs: number): number => {
  return investment(state, yrs) - mortgageDebt(state, yrs);
};

const monthlyYield = (state: FormInputs, yrs: number): number => {
  const currentNetworth = totalNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
};

const monthlyLiquidYield = (state: FormInputs, yrs: number): number => {
  const currentNetworth = liquidNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
};

interface EffaiStrategyResult {
  year: number,
  networth: number,
};

export const effai = (formInputs: FormInputs) => {
  const increment = 0.25;

  function renter(state: FormInputs, year: number): EffaiStrategyResult {
    const livingExpenses = parseFloat(state.livingExpenses);
    const rent = parseFloat(state.rental);
    const renterYield = monthlyYield(state, year);
    const renterGoal = compound(livingExpenses + rent, state.inflation, year);

    return renterYield > renterGoal + 100 || year === 45
      ? { year, networth: totalNetworth(state, year) }
      : renter(state, year + increment);
  }

  function homeOwner(state: FormInputs, year: number): EffaiStrategyResult {
    const expenses = parseFloat(state.livingExpenses) + monthlyHomeCosts(state);
    const homeownerYield = monthlyLiquidYield(state, year);
    const homeownerGoal = compound(expenses, state.inflation, year);

    return homeownerYield > homeownerGoal + 100 || year === 45
      ? { year, networth: totalNetworth(state, year) }
      : homeOwner(state, year + increment);
  }

  function earlyPayoff(state: FormInputs, year: number): EffaiStrategyResult {
    const debt = mortgageDebt(state, year);
    const investments = investment(state, year);

    if (investments > debt) {
      const remaining = renter(
        {
          ...state,
          rental: compound(
            monthlyHomeCosts(state),
            state.inflation,
            year,
          ).toString(),
        },
        0,
      ).year;
      const effaiYear = year + remaining;

      return { year: effaiYear, networth: totalNetworth(state, year) };
    } else {
      const expenses =
        parseFloat(state.livingExpenses) +
        percentage(state.price, state.maintenance) +
        percentage(state.price, state.propertyTax);
      const homeownerYield = monthlyLiquidYield(state, year);
      const homeownerGoal = compound(expenses, state.inflation, year);

      return homeownerYield > homeownerGoal + 100 || year === 45
        ? { year, networth: totalNetworth(state, year) }
        : earlyPayoff(state, year + increment);
    }
  }

  return {
    renter: renter(formInputs, 0),
    homeOwner: homeOwner(formInputs, 0),
    earlyPayoff: earlyPayoff(formInputs, 0),
  };
};

export const years = memoizeWith<FormInputs, number, string>(
  (state: FormInputs): string => JSON.stringify(state),
  (state: FormInputs): number => {
    const { renter, homeOwner, earlyPayoff } = effai(state);

    return Math.min(renter.year, homeOwner.year, earlyPayoff.year);
  },
);
