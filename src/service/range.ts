
import { RangeInfo } from 'model/rangeInfo';

export function generate(
  count: number,
  from: number = 0,
  step: number = 1,
): number[] {
  return [...Array(count)].map((e, i) => {
    return parseFloat((from + i * step).toFixed(1));
  });
}

export function start(
  curr: number,
  rangeInfo: RangeInfo,
  count: number,
): number {
  const { min, max } = rangeInfo;
  const current = Math.min(curr, max);
  const step = rangeInfo.step;
  const steps = parseInt(count / 2);
  const stepsFromMin = (current - min) / step;
  const stepsFromMax = (max - current) / step;

  if (stepsFromMin < steps) {
    return current - step * stepsFromMin;
  } else if (stepsFromMax < steps) {
    return current - step * (count - stepsFromMax - 1);
  }

  return current - step * steps;
}
