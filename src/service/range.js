//import $ from 'lib/jquery';
// import calculator from 'service/calculator';
// import i18n from 'service/i18n';
// import meta from 'service/meta';

export default class Range {
  //
  // static get skip() {
  //   return meta.range / Range.count;
  // }
  //
  // static networth(state) {
  //
  //   let inflation = calculator.toFraction(state.inflation),
  //     withdrawl = calculator.toFraction(state.withdrawl) - 1,
  //     goal = state.goal,
  //     futureGoal,
  //     year,
  //     networth,
  //     cashflow,
  //     rangeData = {
  //       labels: [],
  //       series: [{
  //         name: i18n.networth.chart.myLabel,
  //         data: [],
  //       }, {
  //         name: i18n.networth.chart.goalLabel,
  //         data: [],
  //       }]
  //     };
  //
  //   for (let i = 0; i <= Range.count; i++) {
  //     year = i * Range.skip;
  //     networth = calculator.networth(state, year);
  //     futureGoal = Math.ceil(goal * Math.pow(inflation, year));
  //
  //     rangeData.labels.push(i18n.networth.chart.formatter(year));
  //     cashflow = networth * withdrawl / 12;
  //     rangeData.series[0].data.push(cashflow);
  //     rangeData.series[1].data.push(futureGoal);
  //   }
  //
  //   return rangeData;
  // }
  //
  // static savings(state) {
  //   return Range._calculateRange(state, 'savings', 200);
  // }
  //
  // static goal(state) {
  //   return Range._calculateRange(state, 'goal', 200);
  // }
  //
  // static inflation(state) {
  //   return Range._calculateRange(state, 'inflation', 0.5);
  // }
  //
  // static ror(state) {
  //   return Range._calculateRange(state, 'ror', 0.5);
  // }
  //
  // static _calculateRange(state, prop, minStep) {
  //   let stateCopy = $.extend(true, {}, state),
  //     formatter = i18n[prop].chart.formatter,
  //     step = Math.max(Math.round(stateCopy[prop] * 0.1), minStep),
  //     min = Range.start(state[prop], meta[prop].min, meta[prop].max, step),
  //     fiAge,
  //     propSeries = [],
  //     rangeData = {
  //       labels: [],
  //       series: []
  //     };
  //
  //   stateCopy[prop] = min;
  //
  //   for (let i = 0; i < Range.count; i++) {
  //     fiAge = calculator.calculate(stateCopy);
  //
  //     if (fiAge >= 0 ) {
  //       rangeData.labels.push(formatter(stateCopy[prop]));
  //       propSeries.push(fiAge);
  //     }
  //
  //     stateCopy[prop] += step;
  //   }
  //
  //   rangeData.series.push(propSeries);
  //
  //   return rangeData;
  // }

  static generate(count, start = 0, step = 1) {
    return [...Array(count)].map((e, i) => {
      return (start + i * step).toFixed(1);
    });
  }

  static start(current, rangeInfo, count) {
    let {min, max} = rangeInfo;
    let step = rangeInfo.step;
    let steps = parseInt(count / 2);
    let stepsFromMin = (current - min) / step;
    let stepsFromMax = (max - current) / step;

    if (stepsFromMin < steps) {
      return current - step * stepsFromMin;
    } else if (stepsFromMax < steps) {
      return current - step * (count - stepsFromMax - 1);
    }

    return current - step * steps;
  }
}
