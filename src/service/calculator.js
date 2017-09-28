import { memoize } from 'ramda';
import { remainder } from 'service/amortization';
import * as dateUtils from 'material-ui/DatePicker/dateUtils';

export const toFraction = num => {
  return parseFloat(num) / 100;
};

export const toAddedFraction = num => {
  return 1 + toFraction(num);
};

export const percentage = (amount, rate) => {
  return parseFloat(amount) * toFraction(rate);
};

export const compound = (amount, rate, yrs) => {
  return parseFloat(amount) * Math.pow(toAddedFraction(rate), parseFloat(yrs));
};

export const monthsToNow = date => {
  return dateUtils.monthDiff(new Date(), new Date(date));
};

export const debt = (state, yrs) => {
  const passedPeriods = monthsToNow(state.purchaseDate);

  if (yrs > state.term) {
    return NaN;
  }

  const downpaymentAmount = percentage(state.price, state.downpayment);
  const loan = state.price - downpaymentAmount;
  const rate = toFraction(state.rate / 12);
  const periods = state.term * 12;
  const year = parseInt(yrs);
  const period = year * 12 + passedPeriods;

  return Math.max(0, remainder(loan, periods, rate, period));
};

export const equity = (state, yrs) => {
  const value = compound(state.price, state.houseGrowth, yrs);
  const remaining = debt(state, yrs) || 0;

  return value - remaining;
};

export const investment = (state, yrs) => {
  const currentNetworth = parseInt(state.networth) || 0;
  const ror = toAddedFraction(state.ror);
  const savings = state.savings * 12;
  const inflation = toAddedFraction(state.inflation);
  const factor = ror / inflation;
  const futureSavings = savings * Math.pow(inflation, yrs);
  const futureNetworth = currentNetworth * Math.pow(ror, yrs);

  const f1 = 1 - Math.pow(factor, yrs + 1);
  const f2 = 1 - factor;

  if (inflation === ror) {
    return Math.floor(futureSavings / inflation * yrs + futureNetworth);
  } else {
    return Math.floor(futureSavings * (f1 / f2) + futureNetworth) + 1;
  }
};

export const totalNetworth = (state, yrs) => {
  const houseValue = equity(state, yrs);

  return investment(state, yrs) + houseValue;
};

export const liquidNetworth = (state, yrs) => {
  const currentDebt = debt(state, yrs);

  return investment(state, yrs) - currentDebt;
};

export const totalYield = (state, yrs) => {
  const currentNetworth = totalNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
};

export const liquidYield = (state, yrs) => {
  const currentNetworth = liquidNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
};

export const years = memoize(state => {
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

  const compare = (v1, v2) => {
    const delta = 100;

    if (v1 < v2) {
      return -1;
    } else if (v1 - v2 > delta) {
      return 1;
    } else {
      return 0;
    }
  };

  const renterYears = find(year => {
    const renterYield = totalYield(state, year);
    const renterGoal = compound(state.renter, state.inflation, year);

    return compare(renterYield, renterGoal);
  });

  const homeownerYears = find(year => {
    const homeownerYield = liquidYield(state, year);
    const homeownerGoal = compound(state.homeowner, state.inflation, year);

    return compare(homeownerYield, homeownerGoal);
  });

  return Math.min(renterYears, homeownerYears);
});
