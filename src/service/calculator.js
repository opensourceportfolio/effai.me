export function toFraction(num) {
  return num / 100;
}

export function toAddedFraction(num) {
  return 1 + toFraction(num);
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

export function monthlyYield(state, yrs) {
  const currentNetworth = networth(state, yrs);

  return Math.floor(currentNetworth * state.withdrawl / 100 / 12);
}

export function years(state) {
  const currentNetworth = parseInt(state.networth) || 0;
  const ror = toAddedFraction(state.ror);
  const savings = state.savings * 12;
  const inflation = toAddedFraction(state.inflation);
  const withdrawl = toAddedFraction(state.withdrawl) - 1;
  const goal = state.goal * 12;
  const wealth = goal / withdrawl;

  if (goal === 0) {
    return 0;
  } else if (currentNetworth === 0 && savings === 0) {
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

export function percentage(amount, rate) {
  return amount * toFraction(rate);
}

export function compound(amount, rate, yrs) {
  return amount * Math.pow(toAddedFraction(rate), yrs);
}
