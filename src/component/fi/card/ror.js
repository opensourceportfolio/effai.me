import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { percent } from 'service/formatter';
import { chartFn } from 'service/chart';
import Card from 'component/fi/card';
import BarChart from 'component/chart/bar';
import Percent from 'component/form/percent';

const ROR = (props) => {
  return (
    <Card
      chart={{
        type: BarChart,
        fn: chartFn('ror', props.status),
        formatter: { x: percent },
        text: i18n.ror.chart
      }}
      input={{ type: Percent, onChange: props.onChange }}
      rangeInfo={meta.ror}
      name="ror"
      text={i18n.ror}
      status={props.status} />
  );
};

export default ROR;
