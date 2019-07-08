export function pmt(
  rate: number,
  nperiod: number,
  presentValue: number,
  futureValue: number = 0,
  type: number = 0,
): number {
  if (rate === 0) {
    return -(presentValue + futureValue) / nperiod;
  }

  const interestFactor = Math.pow(1 + rate, nperiod);
  const pmtval =
    (-rate / (interestFactor - 1)) *
    presentValue *
    (interestFactor + futureValue);

  if (type === 1) {
    return pmtval / (1 + rate);
  }

  return pmtval;
}

export function ipmt(
  presentval: number,
  pmtval: number,
  rate: number,
  period: number,
): number {
  const tmp = Math.pow(1 + rate, period);

  return 0 - (presentval * tmp * rate + pmtval * (tmp - 1));
}

export function ppmt(
  rate: number,
  period: number,
  nperiod: number,
  presentValue: number,
  futureValue: number
): number | null | undefined {
  if (period < 1 || period >= nperiod + 1) {
    return null;
  }

  const pmtval = pmt(rate, nperiod, presentValue, futureValue);
  const ipmtval = ipmt(presentValue, pmtval, rate, period - 1);

  return pmtval - ipmtval;
}

export function remainder(
  loan: number,
  nperiod: number,
  rate: number,
  period: number,
): number {
  const payment = -pmt(rate, nperiod, loan);
  const annualRate = rate * 12;

  return (
    (12 * payment) / annualRate -
    ((12 * payment) / annualRate - loan) * (1 + rate) ** period
  );
}
