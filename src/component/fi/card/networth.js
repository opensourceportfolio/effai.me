import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { years, networth, toFraction, compound, monthlyYield } from 'service/calculator';
import { formattedCurrency, longCurrency } from 'service/formatter';
import ChartCard from 'component/fi/chart-card';
import LineChart from 'component/chart/line';
import Currency from 'component/form/currency';

const Networth = ({status, onChange}) => {
  const name = 'networth';
  const value = status[name];
  const yrs = years(status);
  const fiNetworth = formattedCurrency(networth(status, yrs));
  const min = 0;
  const max = Math.min(yrs + 7, meta.range);
  const step = Math.min((yrs + 7) / 7, 7);

  const compoundFn = (v) => {
    const inflation = toFraction(status.inflation);

    return compound(status.goal, inflation, parseFloat(v));
  };

  const text = {
    error: i18n.error.between(meta.networth.min, meta.networth.max),
    placeholder: i18n[name].placeholder(fiNetworth),
  };

  const chart = {
    type: LineChart,
    fn: [(v) => monthlyYield(status, parseFloat(v)), compoundFn],
    formatter: {  y: longCurrency },
    text: i18n[name].chart,
    value: 0,
    rangeInfo: { min, max, step, legend: i18n[name].chart.legend },
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

export default Networth;
