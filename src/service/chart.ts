import { Data } from 'model/chart';
import { RangeInfo } from 'model/rangeInfo';
import { FormInputs } from 'model/state';
import { subtract } from 'ramda';
import { years } from 'service/calculator';
import { generate, start } from 'service/range';

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

const normalizeToMiddle = (vals: number[]): number[] => {
  const min = vals[Math.floor(CHART_COUNT / 2)];
  const subtractMin = (num: number) => subtract(num, min);

  return vals.map(subtractMin);
};

export function toModel(
  labels: string[],
  datasets: number[][],
  legend: string[],
): Data {
  const chartLegend = legend || [];

  return {
    labels,
    datasets: datasets.map((dataset, i) => ({
      label: chartLegend[i],
      data: dataset,
      backgroundColor: chartColors[i],
    })),
  };
}

export function xrange(val: number, rangeInfo: RangeInfo): number[] {
  const value = parseFloat(val.toString());
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

type Fn = (v: string | number) => number;

export function yrange(xval: number[], fn: Fn | Fn[]): number[][] {
  const fns = Array.isArray(fn) ? fn : [fn];

  return fns.map(rangeFn => normalizeToMiddle(xval.map(rangeFn)));
}

// TODO: refactor this
export function chartFn<V>(
  initial: FormInputs,
  next: (inputs: FormInputs, val: V) => FormInputs,
): (v: V) => number {
  const copy: FormInputs = { ...initial };

  return (v: V) => years(next(copy, v));
}
