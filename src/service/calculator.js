export default class Calculator {

  toFraction(num) {
    return 1 + num / 100;
  }

  networth(state, years) {
    let networth = parseInt(state.networth),
      ror = this.toFraction(state.ror),
      savings = state.savings * 12,
      inflation = this.toFraction(state.inflation),
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

  calculate(state) {
    let networth = parseInt(state.networth),
      ror = this.toFraction(state .ror),
      savings = state.savings * 12,
      inflation = this.toFraction(state.inflation),
      withdrawl = this.toFraction(state.withdrawl) - 1,
      goal = state.goal * 12,
      wealth = goal / withdrawl;

    if (inflation === ror) {
      return Math.ceil((wealth - networth) / savings);
    } else {
      let z = ror / inflation,
        f1 = savings - wealth + z * wealth,
        f2 = networth * z - networth + savings * z;

      let result = Math.log(f1 / f2) / Math.log(z);

      return Math.ceil(result);
    }

  }


}
