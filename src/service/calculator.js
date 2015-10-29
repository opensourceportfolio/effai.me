export default class Calculator {

  static toFraction(num) {
    return 1 + num / 100;
  }

  static networth(state, years) {
    let networth = parseInt(state.networth) || 0,
      ror = Calculator.toFraction(state.ror),
      savings = state.savings * 12,
      inflation = Calculator.toFraction(state.inflation),
      factor = ror / inflation,
      futureSavings = savings * Math.pow(inflation, years),
      futureNetworth = networth * Math.pow(ror, years);

    let f1 = 1 - Math.pow(factor, years + 1),
      f2 = 1 - factor;

    if (inflation === ror) {
      return Math.floor(futureSavings / inflation * years + futureNetworth);
    } else {
      return Math.floor(futureSavings * (f1 / f2) + futureNetworth) + 1;
    }
  }

  static monthlyYield(state, years) {
    let networth = Calculator.networth(state, years);

    return Math.floor(networth * state.withdrawl / 100 / 12);
  }

  static calculate(state) {
    let networth = parseInt(state.networth) || 0,
      ror = Calculator.toFraction(state .ror),
      savings = state.savings * 12,
      inflation = Calculator.toFraction(state.inflation),
      withdrawl = Calculator.toFraction(state.withdrawl) - 1,
      goal = state.goal * 12,
      wealth = goal / withdrawl;

    if (goal === 0) {
      return 0;
    } else if (networth === 0 && savings === 0) {
      return 65;
    } else if (inflation === ror) {
      return Math.max(Math.ceil((wealth - networth) / savings), 0);
    } else {
      let z = ror / inflation,
        f1 = savings - wealth + z * wealth,
        f2 = networth * z - networth + savings * z;

      let result = Math.log(f1 / f2) / Math.log(z);

      return Math.max(Math.ceil(result), 0);
    }
  }

  static compound(amount, rate, years) {
    return amount * Math.pow(rate, years);
  }


}
