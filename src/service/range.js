import $ from 'lib/jquery';
import Calculator from 'service/calculator';
import i18n from 'service/i18n';
import meta from 'service/meta';

export default class Range {

  constructor() {
    this.calculator = new Calculator();
    this.i18n = i18n;
    this.count = 5;
    this.skip = meta.range / this.count;
  }

  networth(state) {

    var inflation = this.calculator.toFraction(state.inflation),
      withdrawl = this.calculator.toFraction(state.withdrawl) - 1,
      goal = state.goal,
      futureGoal,
      year,
      networth,
      cashflow,
      rangeData = {
        labels: [],
        series: [{
          name: this.i18n.networth.chart.myLabel,
          data: [],
        }, {
          name: this.i18n.networth.chart.goalLabel,
          data: [],
        }]
      };

    for (var i = 0; i <= this.count; i++) {
      year = i * this.skip;
      networth = this.calculator.networth(state, year);
      futureGoal = Math.ceil(goal * Math.pow(inflation, year));

      rangeData.labels.push(this.i18n.networth.chart.formatter(year));
      cashflow = networth * withdrawl;
      if (state.goalRate === 1) {
        cashflow /= 12;
      }
      rangeData.series[0].data.push(cashflow);
      rangeData.series[1].data.push(futureGoal);
    }

    return rangeData;
  }

  savings(state) {
    return this._calculateRange(state, 'savings');
  }

  goal(state) {
    return this._calculateRange(state, 'goal');
  }

  inflation(state) {
    return this._calculateRange(state, 'inflation');
  }

  ror(state) {
    return this._calculateRange(state, 'ror');
  }

  withdrawl(state) {
    return this._calculateRange(state, 'withdrawl');
  }

  _calculateRange(state, prop) {
    var stateCopy = $.extend(true, {}, state),
      formatter = this.i18n[prop].chart.formatter,
      step = Math.round(stateCopy[prop] * 0.2),
      min = this._min(state[prop], meta[prop].min, step),
      fiAge,
      propSeries = [],
      rangeData = {
        labels: [],
        series: []
      };

    stateCopy[prop] = min;

    for(var i = 0; i < this.count; i++){
      fiAge = this.calculator.calculate(stateCopy);

      if (fiAge >= 0 ){
        rangeData.labels.push(formatter(stateCopy[prop]));
        propSeries.push(fiAge);
      }

      stateCopy[prop] += step;
    }

    rangeData.series.push(propSeries);

    return rangeData;
  }

  _min(current, min, step) {
    var starting2 = current - step * 2,
      starting1 = current - step;

    if (starting2 > min) {
      return starting2;
    } else if (starting1 > min){
      return starting1;
    } else {
      return min;
    }
  }
}
