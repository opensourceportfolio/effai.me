import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { xrange, yrange } from 'service/chart';
import { compound, percentage, toFraction, debt, equity, years } from 'service/calculator';
import { longCurrency, formattedNumber } from 'service/formatter';
import { pmt } from 'service/amortization';
import ChartCard from 'component/fi/chart-card';
import LineChart from 'component/chart/line';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';
import PlainNumber from 'component/form/plainNumber';

const House = ({onChange, status}) => {
  const text = i18n.house;
  const downpaymentAmount = percentage(status.price, status.downpayment);
  const yrs = years(status);

  const debtFn = (year) => {
    return debt(status, year);
  };

  const equityFn = (year) => {
    return equity(status, year);
  };

  const min = 0;
  const max = status.term;
  const step = (max - min) / 5;
  const rangeInfo = { min, max, step };
  const fn = [debtFn, equityFn];
  const x = xrange(0, rangeInfo);
  const y = yrange(x, rangeInfo, fn);
  const chart = {
    type: LineChart,
    plot: {x, y},
    formatter: { y: longCurrency },
    text: text.chart,
    chartOptions: { low: 0 }
  };

  const price = {
    name: 'price',
    onChange,
    text: {
      placeholder: text.price.placeholder,
      error: i18n.error.between(meta.house.price.min, meta.house.price.max),
    },
    value: status.price,
    rangeInfo: meta.house.price,
  };

  const downpayment = {
    name: 'downpayment',
    onChange,
    text: {
      placeholder: text.downpayment.placeholder,
      additional: text.downpayment.additional(downpaymentAmount),
      error: i18n.error.between(meta.house.downpayment.min, meta.house.downpayment.max),
    },
    value: status.downpayment,
    rangeInfo: meta.house.downpayment,
  };

  const payment = pmt(toFraction(status.rate / 12), status.term * 12, -status.price + downpaymentAmount, 0);
  const rate = {
    name: 'rate',
    onChange,
    text: {
      placeholder: text.rate.placeholder,
      additional: text.rate.additional(payment),
      error: i18n.error.between(meta.house.rate.min, meta.house.rate.max),
    },
    value: status.rate,
    rangeInfo: meta.house.rate,
  };

  const term = {
    name: 'term',
    onChange,
    text: {
      placeholder: text.term.placeholder,
      error: i18n.error.between(meta.house.term.min, meta.house.term.max),
    },
    value: status.term,
    rangeInfo: meta.house.term,
    formatter: formattedNumber,
  };

  const futurePrice = compound(status.price, status.houseGrowth, yrs);
  const houseGrowth = {
    name: 'houseGrowth',
    onChange,
    text: {
      placeholder: text.houseGrowth.placeholder,
      additional: text.houseGrowth.additional(futurePrice),
      error: i18n.error.between(meta.house.houseGrowth.min, meta.house.houseGrowth.max),
    },
    value: status.houseGrowth,
    rangeInfo: meta.house.houseGrowth,
  };

  return (
    <ChartCard title={text.title} supporting={text.supporting} chart={chart}>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone">
          <Currency {...price} />
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone">
          <Percent {...downpayment} />
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone">
          <Percent {...rate} />
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone">
          <PlainNumber {...term} />
        </div>
        <div className="mdl-cell">
          <Percent {...houseGrowth} />
        </div>
      </div>
    </ ChartCard>
  );
};

export default House;
