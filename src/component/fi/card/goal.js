import React from 'lib/react';
import {i18n} from 'service/i18n';
import {meta} from 'service/meta';
import { xrange, yrange, chartFn } from 'service/chart';
import {formattedCurrency, longCurrency} from 'service/formatter';
import {years, compound} from 'service/calculator';
import ChartCard from 'component/fi/chart-card';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

const Goal = ({onChange, status}) => {
  const name = 'goal';
  const yrs = years(status);
  const value = status[name];
  const fiGoal = formattedCurrency(compound(value, status.inflation, yrs));

  const text = {
    error: i18n.error.between(meta[name].min, meta[name].max),
    placeholder: i18n[name].placeholder(fiGoal),
  };

  const fn = chartFn(name, status);
  const rangeInfo = meta[name];
  const x = xrange(value, rangeInfo);
  const y = yrange(x, rangeInfo, fn);
  const chart = {
    type: BarChart,
    plot: {x, y},
    formatter: { x: longCurrency },
    text: i18n[name].chart,
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

export default Goal;
