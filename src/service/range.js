export default class Range {

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
