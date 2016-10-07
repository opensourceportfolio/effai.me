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
  const remaining = debt(state, yrs);

  return value - remaining;
}

export function networth(state, yrs) {
  const currentNetworth = parseInt(state.networth) || 0;
  const ror = toAddedFraction(state.ror);
  const savings = state.savings * 12;
  const inflation = toAddedFraction(state.inflation);
  const factor = ror / inflation;
  const futureSavings = savings * Math.pow(inflation, yrs);
  const futureNetworth = currentNetworth * Math.pow(ror, yrs);

  const f1 = 1 - Math.pow(factor, yrs + 1);
  const f2 = 1 - factor;

  const houseValue = equity(state, yrs);

  if (inflation === ror) {
    return Math.floor((futureSavings / inflation * yrs) + futureNetworth) + houseValue;
  } else {
    return (Math.floor((futureSavings * (f1 / f2)) + futureNetworth) + 1) + houseValue;
  }
}

export function monthlyYield(state, yrs) {
  const currentNetworth = networth(state, yrs);

  return Math.floor(currentNetworth * state.withdrawl / 100 / 12);
}

export function years(state) {
  function find(from = 0, to = 45) {
    const mid = Math.ceil((from + to) / 2);

    if (mid === to) {
      return mid;
    } else {
      const midYield = monthlyYield(state, mid);
      const goal = state.goal;

      if (midYield < goal) {
        return find(mid + 1, to);
      } else if (midYield > goal) {
        return find(from, mid);
      } else {
        return mid;
      }
    }
  }

  return find();
}

export function years2(state) {
  const currentNetworth = parseInt(state.networth) || 0;
  const ror = toAddedFraction(state.ror);
  const savings = state.savings * 12;
  const inflation = toAddedFraction(state.inflation);
  const withdrawl = toAddedFraction(state.withdrawl) - 1;
  const goal = state.goal * 12;
  const wealth = goal / withdrawl;

  if (goal === 0) {
    return 0;
  } else if ((currentNetworth === 0 || inflation === ror) && savings === 0) {
    return 65;
  } else if (inflation === ror) {
    return Math.max(Math.ceil((wealth - currentNetworth) / savings), 0);
  } else {
    const z = ror / inflation;
    const f1 = savings - wealth + (z * wealth);
    const f2 = (currentNetworth * z) - currentNetworth + (savings * z);

    const result = Math.log(f1 / f2) / Math.log(z);

    return Math.max(Math.ceil(result), 0);
  }
}
