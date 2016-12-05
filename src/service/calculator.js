import { remainder } from 'service/amortization';

export function toFraction(num) {
  return num / 100;
}

export function toAddedFraction(num) {
  return 1 + toFraction(num);
}

export function percentage(amount, rate) {
  return amount * toFraction(rate);
}

export function compound(amount, rate, yrs) {
  return amount * Math.pow(toAddedFraction(rate), yrs);
}

export function debt(state, yrs) {
  if (yrs > state.term) {
    return NaN;
  }

  const downpaymentAmount = percentage(state.price, state.downpayment);
  const loan = state.price - downpaymentAmount;
  const rate = toFraction(state.rate / 12);
  const periods = state.term * 12;
  const year = parseInt(yrs);
  const period = year * 12;

  return remainder(loan, periods, rate, period);
}

export function equity(state, yrs) {
  const value = compound(state.price, state.houseGrowth, yrs);
  const remaining = debt(state, yrs) || 0;

  return value - remaining;
}

export function investment(state, yrs) {
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
    return Math.floor((futureSavings / inflation * yrs) + futureNetworth);
  } else {
    return Math.floor((futureSavings * (f1 / f2)) + futureNetworth) + 1;
  }
}

export function totalNetworth(state, yrs) {
  const houseValue = equity(state, yrs);

  return investment(state, yrs) + houseValue;
}

export function liquidNetworth(state, yrs) {
  const currentDebt = debt(state, yrs);

  return investment(state, yrs) - currentDebt;
}

export function totalYield(state, yrs) {
  const currentNetworth = totalNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
}

export function liquidYield(state, yrs) {
  const currentNetworth = liquidNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
}

// Change to epsilon

export function years(state) {
  function find(compareFn, from = 0, to = 45) {
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
  }

  const compare = (v1, v2) => {
    const epsilon = 100;

    if (v1 < v2) {
      return -1;
    } else if (v1 - v2 > epsilon) {
      return 1;
    } else {
      return 0;
    }
  };

  const renterYears = find((year) => {
    const renterYield = totalYield(state, year);
    const renterGoal = compound(state.renter, state.inflation, year);

    return compare(renterYield, renterGoal);
  });

  const homeownerYears = find((year) => {
    const homeownerYield = liquidYield(state, year);
    const homeownerGoal = compound(state.homeowner, state.inflation, year);

    return compare(homeownerYield, homeownerGoal);
  });

  return Math.min(renterYears, homeownerYears);
}
