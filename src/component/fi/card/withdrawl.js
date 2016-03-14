import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { percent } from 'service/formatter';
import { chartFn } from 'service/chart';
import Card from 'component/fi/card';
import BarChart from 'component/chart/bar';
import Percent from 'component/form/percent';

const Withdrawl = (props) => {
  let status = props.status;

  return (
    <Card
      chart={{
        type: BarChart,
        fn: chartFn('withdrawl', status),
        formatter: { x: percent },
        text: i18n.withdrawl.chart,
      }}
      input={{ type: Percent, onChange: props.onChange }}
      rangeInfo={meta.withdrawl}
      name="withdrawl"
      text={i18n.withdrawl}
      status={status} />
  );
};

export default Withdrawl;
