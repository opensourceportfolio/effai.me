export default class Amortization {

  pmt(rate, nperiod, presentValue, futureValue = 0, type = 0) {
    if (rate === 0) {
      return -(presentValue + futureValue) / nperiod;
    }

    let interestFactor = Math.pow(1 + rate, nperiod);
    let pmt = rate / (interestFactor - 1) * -(presentValue * interestFactor + futureValue);

    if (type === 1) {
      pmt /= (1 + rate);
    }

    return pmt;
  }

  ipmt(presentValue, pmt, rate, period) {
    let tmp = Math.pow(1 + rate, period);

    return 0 - (presentValue * tmp * rate + pmt * (tmp - 1));
  }

  ppmt(rate, period, nperiod, presentValue, futureValue, type) {
    if (period < 1 || (period >= nperiod + 1)) {
      return null;
    }

    let pmt = Amortization.pmt(rate, nperiod, presentValue, futureValue, type);
    let ipmt = Amortization.ipmt(presentValue, pmt, rate, period - 1);

    return pmt - ipmt;
  }

}
