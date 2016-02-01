export function toFraction(num) {
  return 1 + num / 100;
}

export function networth(state, yrs) {
  let currentNetworth = parseInt(state.networth) || 0,
    ror = toFraction(state.ror),
    savings = state.savings * 12,
    inflation = toFraction(state.inflation),
    factor = ror / inflation,
    futureSavings = savings * Math.pow(inflation, yrs),
    futureNetworth = currentNetworth * Math.pow(ror, yrs);

  let f1 = 1 - Math.pow(factor, yrs + 1),
    f2 = 1 - factor;

  if (inflation === ror) {
    return Math.floor(futureSavings / inflation * yrs + futureNetworth);
  } else {
    return Math.floor(futureSavings * (f1 / f2) + futureNetworth) + 1;
  }
}

export function monthlyYield(state, yrs) {
  let currentNetworth = networth(state, yrs);

  return Math.floor(currentNetworth * state.withdrawl / 100 / 12);
}

export function years(state) {
  let currentNetworth = parseInt(state.networth) || 0,
    ror = toFraction(state.ror),
    savings = state.savings * 12,
    inflation = toFraction(state.inflation),
    withdrawl = toFraction(state.withdrawl) - 1,
    goal = state.goal * 12,
    wealth = goal / withdrawl;

  if (goal === 0) {
    return 0;
  } else if (currentNetworth === 0 && savings === 0) {
    return 65;
  } else if (inflation === ror) {
    return Math.max(Math.ceil((wealth - currentNetworth) / savings), 0);
  } else {
    let z = ror / inflation,
      f1 = savings - wealth + z * wealth,
      f2 = currentNetworth * z - currentNetworth + savings * z;

    let result = Math.log(f1 / f2) / Math.log(z);

    return Math.max(Math.ceil(result), 0);
  }
}

export function compound(amount, rate, yrs) {
  return amount * Math.pow(rate, yrs);
}
