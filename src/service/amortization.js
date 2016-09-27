export function pmt(rate, nperiod, presentValue, futureValue = 0, type = 0) {
  if (rate === 0) {
    return -(presentValue + futureValue) / nperiod;
  }

  const interestFactor = Math.pow(1 + rate, nperiod);
  let pmtval = rate / (interestFactor - 1) * -1 * ((presentValue * interestFactor) + futureValue);

  if (type === 1) {
    pmtval /= 1 + rate;
  }

  return pmtval;
}

export function ipmt(presentval, pmtval, rate, period) {
  const tmp = Math.pow(1 + rate, period);

  return 0 - ((presentval * tmp * rate) + (pmtval * (tmp - 1)));
}

export function ppmt(rate, period, nperiod, presentValue, futureValue, type) {
  if (period < 1 || (period >= nperiod + 1)) {
    return null;
  }

  const pmtval = pmt(rate, nperiod, presentValue, futureValue, type);
  const ipmtval = ipmt(presentValue, pmtval, rate, period - 1);

  return pmtval - ipmtval;
}
