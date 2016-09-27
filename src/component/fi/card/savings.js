import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { formattedCurrency, longCurrency } from 'service/formatter';
import { years, compound } from 'service/calculator';
import { chartFn } from 'service/chart';
import ChartCard from 'component/fi/chart-card';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

const Savings = ({status, onChange}) => {
  const name = 'savings';
  const value = status[name];
  const yrs = years(status);
  const fiSavings = formattedCurrency(compound(status.savings, status.inflation, yrs));

  const text = {
    error: i18n.error.between(meta.savings.min, meta.savings.max),
    placeholder: i18n[name].placeholder(fiSavings),
  };

  const chart = {
    type: BarChart,
    fn: chartFn(name, status),
    rangeInfo: meta[name],
    text: i18n[name].chart,
    value,
    formatter: { x: longCurrency },
  };

  const input = {
    name,
    onChange,
    text,
    value,
    rangeInfo: meta[name],
  };

  return (
    <ChartCard title={i18n[name].title} supporting={i18n[name].supporting} chart={chart}>
      <Currency {...input} />
    </ ChartCard>
  );
};

export default Savings;
