import { start, generate } from 'service/range';
import { years } from 'service/calculator';

export const CHART_COUNT = 7;

export function toModel(labels, datasets, legend) {
  const chartLegend = legend || [];

  return {
    labels,
    datasets: datasets.map((dataset, i) => {
      return {
        label: chartLegend[i],
        data: dataset,
      };
    }),
  };
}

export function xrange(val, rangeInfo) {
  const value = parseFloat(val);
  const { min, max } = rangeInfo;
  const step = Math.max(value * 0.1, rangeInfo.step);
  const minStep = Math.max(rangeInfo.step, Math.floor(step / rangeInfo.step) * rangeInfo.step);
  const from = start(value, { min, max, step: minStep }, CHART_COUNT);
  const xval = generate(CHART_COUNT, from, minStep);

  return xval;
}

export function yrange(xval, rangeInfo, fn) {

  const fns = Array.isArray(fn) ? fn : [fn];
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
