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


  if (inflation === ror) {
    return Math.floor((futureSavings / inflation * yrs) + futureNetworth);
  } else {
    return Math.floor((futureSavings * (f1 / f2)) + futureNetworth) + 1;
  }
}

export function totalNetworth(state, yrs) {
  const houseValue = equity(state, yrs);

  return networth(state, yrs) + houseValue;
}

export function monthlyYield(state, yrs) {
  const currentNetworth = totalNetworth(state, yrs);

  return Math.floor(percentage(currentNetworth, state.withdrawl) / 12);
}

export function years(state) {
  function find(from = 0, to = 45) {
    const mid = Math.floor((from + to) / 2);

    if (from === to) {
      return mid;
    } else {
      const midYield = monthlyYield(state, mid);
      const goal = compound(state.goal, state.inflation, mid);

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
