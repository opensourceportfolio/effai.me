import React from 'lib/react';
import i18n from 'service/i18n';
import meta from 'service/meta';
import formatter from 'service/formatter';
import { FICard } from 'component/fi/card/index';
import { BarChart } from 'component/chart/bar';
import { Percent } from 'component/form/percent';

export class Withdrawl extends React.Component {

  render() {
    let status = this.props.status;

    return (
      <FICard
        chart={{
          type: BarChart,
          fn: FICard.chartFn('withdrawl', status),
          formatter: { x: formatter.percent },
          text: i18n.withdrawl.chart,
        }}
        input={{ type: Percent, onChange: this.props.onChange }}
        rangeInfo={meta.withdrawl}
        name="withdrawl"
        text={i18n.withdrawl}
        status={status} />
    );
  }
}
