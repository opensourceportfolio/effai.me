export function generate(count, from = 0, step = 1) {
  return [...Array(count)].map((e, i) => {
    return parseFloat((from + (i * step)).toFixed(1));
  });
}

export function start(curr, rangeInfo, count) {
  const {min, max} = rangeInfo;
  const current = Math.min(curr, max);
  const step = rangeInfo.step;
  const steps = parseInt(count / 2);
  const stepsFromMin = (current - min) / step;
  const stepsFromMax = (max - current) / step;

  if (stepsFromMin < steps) {
    return current - (step * stepsFromMin);
  } else if (stepsFromMax < steps) {
    return current - (step * (count - stepsFromMax - 1));
  }

  return current - (step * steps);
}
