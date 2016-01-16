import $ from 'lib/jquery';
import Range from 'service/range';

const CHART_COUNT = 7;

export default class ChartRange {

  static toModel(labels, chartData, formatter, legend) {
    let chartLegend = legend || [];
    let noop = (v) => v;

    return {
      labels: labels.map(formatter || noop),
      series: chartData.map((series, i) => {
        return {
          name: chartLegend[i],
          data: series.map((e) => {
            return e;
          }),
        };
      })
    };
  }

  static xrange(value, rangeInfo) {
    let { min, max } = rangeInfo;
    let step = Math.max(value * 0.1, rangeInfo.step);
    let minStep = Math.max(rangeInfo.step, Math.floor(step / rangeInfo.step) * rangeInfo.step);
    let start = Range.start(value, { min, max, step: minStep }, CHART_COUNT);
    let xrange = Range.generate(CHART_COUNT, start, minStep);

    return xrange;
  }

  static yrange(xrange, rangeInfo, fn) {

    let fns = $.isArray(fn) ? fn : [fn];
    let yrange = fns.map((rangeFn) => {
      return xrange.map(rangeFn);
    });

    return yrange;
  }

}
