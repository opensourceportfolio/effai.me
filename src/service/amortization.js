export function pmt(rate, nperiod, presentValue, futureValue = 0, type = 0) {
  if (rate === 0) {
    return -(presentValue + futureValue) / nperiod;
  }

  let interestFactor = Math.pow(1 + rate, nperiod);
  let pmtval = rate / (interestFactor - 1) * -(presentValue * interestFactor + futureValue);

  if (type === 1) {
    pmtval /= (1 + rate);
  }

  return pmt;
}

export function ipmt(presentval, pmtval, rate, period) {
  let tmp = Math.pow(1 + rate, period);

  return 0 - (presentval * tmp * rate + pmtval * (tmp - 1));
}

export function ppmt(rate, period, nperiod, presentValue, futureValue, type) {
  if (period < 1 || (period >= nperiod + 1)) {
    return null;
  }

  let pmtval = pmt(rate, nperiod, presentValue, futureValue, type);
  let ipmtval = ipmt(presentValue, pmt, rate, period - 1);

  return pmtval - ipmtval;
}
