import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { percent } from 'service/formatter';
import { chartFn } from 'service/chart';
import Card from 'component/fi/card';
import BarChart from 'component/chart/bar';
import Percent from 'component/form/percent';

const Inflation = (props) => {
  let status = props.status;

  return (
    <Card
      chart={{
        type: BarChart,
        fn: chartFn('inflation', status),
        formatter: { x: percent },
        text: i18n.inflation.chart,
      }}
      input={{ type: Percent, onChange: props.onChange }}
      rangeInfo={meta.inflation}
      name="inflation"
      text={i18n.inflation}
      status={status} />
  );
};

export default Inflation;
