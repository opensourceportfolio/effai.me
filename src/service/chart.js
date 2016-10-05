import R from 'lib/ramda';
import { start, generate } from 'service/range';
import { years } from 'service/calculator';

export const CHART_COUNT = 7;

export function toModel(labels, chartData, legend) {
  const chartLegend = legend || [];

  return {
    labels,
    series: chartData.map((series, i) => {
      return {
        name: chartLegend[i],
        data: series,
      };
    }),
  };
}

export function xrange(value, rangeInfo) {
  const { min, max, count = CHART_COUNT } = rangeInfo;
  const step = Math.max(value * 0.1, rangeInfo.step);
  const minStep = Math.max(rangeInfo.step, Math.floor(step / rangeInfo.step) * rangeInfo.step);
  const from = start(value, { min, max, step: minStep }, count);
  const xval = generate(count, from, minStep);

  return xval;
}

export function yrange(xval, rangeInfo, fn) {

  const fns = R.isArrayLike(fn) ? fn : [fn];
  const yval = fns.map((rangeFn) => {
    return xval.map(rangeFn);
  });

  return yval;
}

// TODO: refactor this
export function chartFn(name, state) {
  const stateCopy = Object.assign({}, state);

  return (e) => {
    stateCopy[name] = e;

    return years(stateCopy);
  };
}
