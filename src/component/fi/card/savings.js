import React from 'lib/react';
import i18n from 'service/i18n';
import meta from 'service/meta';
import formatter from 'service/formatter';
import calculator from 'service/calculator';
import { FICard } from 'component/fi/card/index';
import { BarChart } from 'component/chart/bar';
import { Currency } from 'component/form/currency';

export class Savings extends React.Component {

  render() {
    let status = this.props.status;
    let text = i18n.savings;
    let years = calculator.calculate(status);
    let inflation = calculator.toFraction(status.inflation);
    let fiSavings = formatter.currency(calculator.compound(status.savings, inflation, years));

    return (
      <FICard
        chart={{
          type: BarChart,
          fn: FICard.chartFn('savings', status),
          formatter: formatter.currency,
          text: i18n.savings.chart
        }}
        input={{ type: Currency, onChange: this.props.onChange }}
        rangeInfo={meta.savings}
        name="savings"
        text={{
          title: text.title,
          supporting: text.supporting,
          placeholder: text.placeholder(fiSavings)
        }}
        status={status} />
    );
  }
}
