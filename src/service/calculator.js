export default class Calculator {

  toFraction(num) {
    return 1 + num / 100;
  }

  toAnnual(amount, period) {
    return parseInt(period) === 2 ? parseInt(amount) : parseInt(amount) * 12;
  }

  networth(state, years) {
    var networth = parseInt(state.networth),
      ror = this.toFraction(state.ror),
      savings = this.toAnnual(state.savings, state.savingsRate),
      inflation = this.toFraction(state.inflation),
      factor = ror / inflation,
      futureSavings = savings * Math.pow(inflation, years);

    var f1 = 1 - Math.pow(factor, years),
      f2 = 1 - factor;

    return Math.floor(futureSavings * (f1 / f2) + networth * Math.pow(ror, years));
  }

  calculate(state) {
    var networth = parseInt(state.networth),
      ror = this.toFraction(state.ror),
      savings = this.toAnnual(state.savings, state.savingsRate),
      inflation = this.toFraction(state.inflation),
      withdrawl = this.toFraction(state.withdrawl) - 1,
      goal = this.toAnnual(state.goal, state.goalRate),
      wealth = goal / withdrawl;

    var z = ror / inflation,
      f1 = savings - wealth + z * wealth,
      f2 = networth * z - networth + savings * z;

    var result = Math.log(f1 / f2) / Math.log(z);

    return Math.ceil(result);

  }


}
