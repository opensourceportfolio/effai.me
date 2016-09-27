import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { compound, percentage, toFraction, years } from 'service/calculator';
import { longCurrency } from 'service/formatter';
import { pmt, ppmt } from 'service/amortization';
import ChartCard from 'component/fi/chart-card';
import LineChart from 'component/chart/line';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';
import PlainNumber from 'component/form/plainNumber';

const House = ({onChange, status}) => {
  const text = i18n.house;
  const downpaymentAmount = percentage(status.price, status.downpayment);
  const chartFn = () => {
    const values = new Map();

    return function debt (c) {
      const year = parseInt(c);
      const currentTerm = year * 12;

      if (values.has(year)) {
        return values.get(year);
      } else if (year === 0) {
        return status.price - downpaymentAmount;
      } else {
        const previousDebt = debt(c - 1);
        const ppmtStart = ppmt(toFraction(status.rate / 12), currentTerm, status.term * 12, -previousDebt, 0);
        const ppmtEnd = ppmt(toFraction(status.rate / 12), currentTerm + 12, status.term * 12, -previousDebt, 0);
        const average = (ppmtStart + ppmtEnd) / 2;
        const newDebt = previousDebt - (average * 12);

        values.set(currentTerm, newDebt);

        return newDebt;
      }
    };
  };

  const yrs = years(status);
  const min = 0;
  const max = Math.min(7, meta.range);
  const step = Math.min((yrs + 7) / 7, 7);
  const chart = {
    type: LineChart,
    fn: chartFn(),
    formatter: { y: longCurrency },
    text: text.chart,
    value: 0,
    rangeInfo: { min, max, step },
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
