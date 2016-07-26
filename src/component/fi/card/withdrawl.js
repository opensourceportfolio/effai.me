import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { percent } from 'service/formatter';
import { chartFn } from 'service/chart';
import ChartCard from 'component/fi/chart-card';
import BarChart from 'component/chart/bar';
import Percent from 'component/form/percent';

const Withdrawl = ({status, onChange}) => {
  const name = 'withdrawl';
  const value = status[name];

  const chart = {
    type: BarChart,
    fn: chartFn(name, status),
    formatter: { x: percent },
    text: i18n[name].chart,
    value,
    rangeInfo: meta[name],
  };

  const input = {
    name,
    onChange,
    text: i18n[name],
    value,
    rangeInfo: meta[name],
  };

  return (
    <ChartCard title={i18n[name].title} supporting={i18n[name].supporting} chart={chart}>
      <Percent {...input} />
    </ ChartCard>
  );
};

export default Withdrawl;
