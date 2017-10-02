import { start, generate } from 'service/range';
import { years } from 'service/calculator';

const chartColors = [
  'rgba(255, 99, 132, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(255, 205, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(231,233,237, 0.5)',
];

export const CHART_COUNT = 7;

export function toModel(labels, datasets, legend) {
  const chartLegend = legend || [];

  return {
    labels,
    datasets: datasets.map((dataset, i) => {
      return {
        label: chartLegend[i],
        data: dataset,
        backgroundColor: chartColors[i],
      };
    }),
  };
}

export function xrange(val, rangeInfo) {
  const value = parseFloat(val);
  const { min, max } = rangeInfo;
  const step = Math.max(value * 0.1, rangeInfo.step);
  const minStep = Math.max(
    rangeInfo.step,
    Math.floor(step / rangeInfo.step) * rangeInfo.step,
  );
  const from = start(value, { min, max, step: minStep }, CHART_COUNT);
  const xval = generate(CHART_COUNT, from, minStep);

  return xval;
}

export function yrange(xval, rangeInfo, fn) {
  const fns = Array.isArray(fn) ? fn : [fn];
  const yval = fns.map(rangeFn => {
    return xval.map(rangeFn);
  });

  return yval;
}

// TODO: refactor this
export function chartFn(name, state) {
  const stateCopy = { ...state };

  return e => {
    stateCopy[name] = e;

    return years(stateCopy);
  };
}
