import $ from 'lib/jquery';
import calculator from 'service/calculator';
import i18n from 'service/i18n';
import meta from 'service/meta';

export default class Range {

  static get count() {
    return 5;
  }

  static get skip() {
    return meta.range / Range.count;
  }

  static networth(state) {

    let inflation = calculator.toFraction(state.inflation),
      withdrawl = calculator.toFraction(state.withdrawl) - 1,
      goal = state.goal,
      futureGoal,
      year,
      networth,
      cashflow,
      rangeData = {
        labels: [],
        series: [{
          name: i18n.networth.chart.myLabel,
          data: [],
        }, {
          name: i18n.networth.chart.goalLabel,
          data: [],
        }]
      };

    for (let i = 0; i <= Range.count; i++) {
      year = i * Range.skip;
      networth = calculator.networth(state, year);
      futureGoal = Math.ceil(goal * Math.pow(inflation, year));

      rangeData.labels.push(i18n.networth.chart.formatter(year));
      cashflow = networth * withdrawl / 12;
      rangeData.series[0].data.push(cashflow);
      rangeData.series[1].data.push(futureGoal);
    }

    return rangeData;
  }

  static savings(state) {
    return Range._calculateRange(state, 'savings');
  }

  static goal(state) {
    return Range._calculateRange(state, 'goal');
  }

  static inflation(state) {
    return Range._calculateRange(state, 'inflation');
  }

  static ror(state) {
    return Range._calculateRange(state, 'ror');
  }

  static withdrawl(state) {
    return Range._calculateRange(state, 'withdrawl');
  }

  static _calculateRange(state, prop) {
    let stateCopy = $.extend(true, {}, state),
      formatter = i18n[prop].chart.formatter,
      step = Math.round(stateCopy[prop] * 0.2),
      min = Range._min(state[prop], meta[prop].min, step),
      fiAge,
      propSeries = [],
      rangeData = {
        labels: [],
        series: []
      };

    stateCopy[prop] = min;

    for (let i = 0; i < Range.count; i++) {
      fiAge = calculator.calculate(stateCopy);

      if (fiAge >= 0 ) {
        rangeData.labels.push(formatter(stateCopy[prop]));
        propSeries.push(fiAge);
      }

      stateCopy[prop] += step;
    }

    rangeData.series.push(propSeries);

    return rangeData;
  }

  static _min(current, min, step) {
    let starting2 = current - step * 2,
      starting1 = current - step;

    if (starting2 > min) {
      return starting2;
    } else if (starting1 > min) {
      return starting1;
    } else {
      return min;
    }
  }
}
