// @flow
import { memoize } from 'ramda';
import { remainder } from 'service/amortization';
import * as dateUtils from 'material-ui/DatePicker/dateUtils';
import { type FormInputs } from 'model/state';
import { type NumberLike } from 'model/number-like';

export const toFraction = (num: NumberLike): number => {
  return parseFloat(num) / 100;
};

export const toAddedFraction = (num: NumberLike): number => {
  return 1 + toFraction(num);
};

export const percentage = (amount: NumberLike, rate: NumberLike): number => {
  return parseFloat(amount) * toFraction(rate);
};

export const compound = (
  amount: NumberLike,
  rate: NumberLike,
  yrs: NumberLike,
): number => {
  return parseFloat(amount) * Math.pow(toAddedFraction(rate), parseFloat(yrs));
};

export const monthsToNow = (date: Date | NumberLike): number => {
  return dateUtils.monthDiff(new Date(), new Date(date));
};

export const mortgageDebt = (state: FormInputs, yrs: NumberLike): number => {
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

export const homeEquity = (state: FormInputs, yrs: NumberLike): number => {
  const { price, houseGrowth } = state;
  const value = compound(parseFloat(price), parseFloat(houseGrowth), yrs);
  const remaining = mortgageDebt(state, yrs) || 0;

  return value - remaining;
};

export const investment = (state: FormInputs, yrs: number): number => {
  const { ror, savings, inflation } = state;
  const currentNetworth = parseInt(state.networth) || 0;
  const rorFraction = toAddedFraction(ror);
  const annualSavings = parseFloat(savings) * 12;
  const inflationFraction = toAddedFraction(inflation);
  const factor = rorFraction / inflationFraction;
  const futureSavings = annualSavings * Math.pow(inflationFraction, yrs);
  const futureNetworth = currentNetworth * Math.pow(rorFraction, yrs);

  const f1 = 1 - Math.pow(factor, yrs + 1);
  const f2 = 1 - factor;

  if (inflationFraction === rorFraction) {
    return Math.floor(futureSavings / inflationFraction * yrs + futureNetworth);
  } else {
    return Math.floor(futureSavings * (f1 / f2) + futureNetworth) + 1;
  }
};

export const totalNetworth = (state: FormInputs, yrs: number): number => {
  const houseValue = homeEquity(state, yrs);

  return investment(state, yrs) + houseValue;
};

export const liquidNetworth = (state: FormInputs, yrs: number): number => {
  const currentDebt = mortgageDebt(state, yrs);

  return investment(state, yrs) - currentDebt;
};

export const totalYield = (state: FormInputs, yrs: number): number => {
  const currentNetworth = totalNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
};

export const liquidYield = (state: FormInputs, yrs: number): number => {
  const currentNetworth = liquidNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
};

export const years = memoize((state: FormInputs): number => {
  const find = (compareFn, from = 0, to = 45) => {
    const delta = 0.1;
    const mid = (from + to) / 2;

    if (Math.abs(from - to) <= 2 * delta) {
      return mid;
    } else {
      const cmp = compareFn(mid);

      if (cmp < 0) {
        return find(compareFn, mid + delta, to);
      } else if (cmp > 0) {
        return find(compareFn, from, mid);
      } else {
        return mid;
      }
    }
  };

  const compare = (v1: number, v2: number): number => {
    const delta = 100;

    if (v1 < v2) {
      return -1;
    } else if (v1 - v2 > delta) {
      return 1;
    } else {
      return 0;
    }
  };

  const renterYears = find((year: number): number => {
    const expenses = parseInt(state.livingExpenses) + parseInt(state.rental);
    const renterYield = totalYield(state, year);
    const renterGoal = compound(expenses, state.inflation, year);

    return compare(renterYield, renterGoal);
  });

  const homeownerYears = state.isHomeOwner
    ? find(year => {
        const expenses =
          parseInt(state.livingExpenses) +
          percentage(state.price, state.maintenance) +
          percentage(state.price, state.propertyTax);
        const homeownerYield = liquidYield(state, year);
        const homeownerGoal = compound(expenses, state.inflation, year);

        return compare(homeownerYield, homeownerGoal);
      })
    : Number.MAX_SAFE_INTEGER;

  return Math.min(renterYears, homeownerYears);
});
