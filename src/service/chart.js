import R from 'lib/ramda';
import { start, generate } from 'service/range';
import { years } from 'service/calculator';

export const CHART_COUNT = 7;

export function toModel(labels, chartData, legend) {
  let chartLegend = legend || [];

  return {
    labels,
    series: chartData.map((series, i) => {
      return {
        name: chartLegend[i],
        data: series,
      };
    })
  };
}

export function xrange(value, rangeInfo) {
  let { min, max } = rangeInfo;
  let step = Math.max(value * 0.1, rangeInfo.step);
  let minStep = Math.max(rangeInfo.step, Math.floor(step / rangeInfo.step) * rangeInfo.step);
  let from = start(value, { min, max, step: minStep }, CHART_COUNT);
  let xval = generate(CHART_COUNT, from, minStep);

  return xval;
}

export function yrange(xval, rangeInfo, fn) {

  let fns = R.isArrayLike(fn) ? fn : [fn];
  let yval = fns.map((rangeFn) => {
    return xval.map(rangeFn);
  });

  return yval;
}

// TODO: refactor this
export function chartFn(name, state) {
  let stateCopy = Object.assign({}, state);

  return (e) => {
    stateCopy[name] = e;
    return years(stateCopy);
  };
}
