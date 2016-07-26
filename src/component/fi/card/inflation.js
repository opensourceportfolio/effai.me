import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { percent } from 'service/formatter';
import { chartFn } from 'service/chart';
import ChartCard from 'component/fi/chart-card';
import BarChart from 'component/chart/bar';
import Percent from 'component/form/percent';

const Inflation = ({status, onChange}) => {
  const name = 'inflation';
  const text = i18n[name];
  const value = status[name];

  const chart = {
    type: BarChart,
    fn: chartFn(name, status),
    formatter: { x: percent },
    text: i18n[name].chart,
    value: status[name],
    rangeInfo: meta[name],
  };

  const input = {
    name,
    onChange,
    text,
    value,
    rangeInfo: meta[name],
  };

  return (
    <ChartCard title={text.title} supporting={text.supporting} chart={chart}>
      <Percent {...input} />
    </ ChartCard>
  );
};

export default Inflation;
