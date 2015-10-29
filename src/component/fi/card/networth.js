import React from 'lib/react';
import i18n from 'service/i18n';
import meta from 'service/meta';
import Calculator from 'service/calculator';
import Formatter from 'service/formatter';
import { FICard } from 'component/fi/card/index';
import { LineChart } from 'component/chart/line';
import { Currency } from 'component/form/currency';

export class Networth extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let status = this.props.status;
    let years = Calculator.calculate(status);
    let fiNetworth = Formatter.currency(Calculator.networth(status, years));
    let min = 0;
    let max = Math.min(years + 7, meta.range);
    let step = Math.min((years + 7) / 7, 7);
    let text = i18n.networth;

    let compoundFn = (v) => {
      let inflation = Calculator.toFraction(status.inflation);

      return Calculator.compound(status.goal, inflation, parseFloat(v));
    };

    let monthlyYield = (v) => {
      return Calculator.monthlyYield(status, parseFloat(v));
    };

    return (
      <FICard
        chart={{
          type: LineChart,
          value: 0,
          rangeInfo: { min, max, step, legend: i18n.networth.chart.legend },
          fn: [monthlyYield, compoundFn],
          text: i18n.networth.chart
        }}
        input={{ type: Currency, onChange: this.props.onChange }}
        rangeInfo={meta.networth}
        name="networth"
        text={{
          title: text.title,
          supporting: text.supporting,
          placeholder: text.placeholder(fiNetworth)
        }}
        status={status} />
    );
  }
}
