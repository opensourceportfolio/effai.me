import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { compound, percentage, toFraction } from 'service/calculator';
import { longCurrency } from 'service/formatter';
import { pmt, remainder } from 'service/amortization';
import ChartCard from 'component/fi/chart-card';
import LineChart from 'component/chart/line';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';
import PlainNumber from 'component/form/plainNumber';

const House = ({onChange, status}) => {
  const text = i18n.house;
  const downpaymentAmount = percentage(status.price, status.downpayment);
  const remainingBalanceFn = (v) => {
    const loan = status.price - downpaymentAmount;
    const rate = toFraction(status.rate / 12);
    const periods = status.term * 12;
    const year = parseInt(v);
    const period = year * 12;

    return remainder(loan, periods, rate, period);
  };
  const priceFn = (v) => {
    return compound(status.price, status.houseGrowth, v);
  };
  const equity = (v) => {
    return priceFn(v) - remainingBalanceFn(v);
  };

  const min = 0;
  const max = status.term;
  const chart = {
    type: LineChart,
    fn: [remainingBalanceFn, equity],
    formatter: { y: longCurrency },
    text: text.chart,
    value: 0,
    rangeInfo: { min, max, step: 5, points: max / 5 },
    chartOptions: { low: 0 }
  };

  const price = {
    name: 'price',
    onChange,
    text: text.price,
    value: status.price,
    rangeInfo: meta.house.price,
  };

  const downpayment = {
    name: 'downpayment',
    onChange,
    text: {
      placeholder: text.downpayment.placeholder(downpaymentAmount)
    },
    value: status.downpayment,
    rangeInfo: meta.house.downpayment,
  };

  const payment = pmt(toFraction(status.rate / 12), status.term * 12, -status.price + downpaymentAmount, 0);
  const rate = {
    name: 'rate',
    onChange,
    text: {
      placeholder: text.rate.placeholder(payment)
    },
    value: status.rate,
    rangeInfo: meta.house.rate,
  };

  const term = {
    name: 'term',
    onChange,
    text: text.term,
    value: status.term,
    rangeInfo: meta.house.term,
  };

  const futurePrice = compound(status.price, status.rate, status.term);
  const houseGrowth = {
    name: 'houseGrowth',
    onChange,
    text: {
      placeholder: text.houseGrowth.placeholder(futurePrice),
    },
    value: status.houseGrowth,
    rangeInfo: meta.house.houseGrowth,
  };

  return (
    <ChartCard title={text.title} supporting={text.supporting} chart={chart}>
      <Currency {...price} />
      <Percent {...downpayment} />
      <Percent {...rate} />
      <PlainNumber {...term} />
      <Percent {...houseGrowth} />
    </ ChartCard>
  );
};

export default House;
