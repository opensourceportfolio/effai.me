import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { currency } from 'service/formatter';
import { chartFn } from 'service/chart';
import ChartCard from 'component/fi/chart-card';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

const House = ({onChange, status}) => {
  const name = 'house';
  const text = i18n.house;
  const value = status.house;

  const chart = {
    type: BarChart,
    fn: chartFn(name, status),
    formatter: { y: currency },
    text: i18n.house.chart,
    value: status.house,
    rangeInfo: meta.goal,
  };

  const input = {
    name,
    onChange,
    text,
    value,
    rangeInfo: meta.house,
  };

  return (
    <ChartCard title={text.title} supporting={text.supporting} chart={chart}>
      <Currency {...input} />
    </ ChartCard>
  );
};

export default House;
