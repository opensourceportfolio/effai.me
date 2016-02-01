import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { formattedCurrency, longCurrency } from 'service/formatter';
import { years, toFraction, compound } from 'service/calculator';
import FICard from 'component/fi/card/index';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

export default class Savings extends React.Component {

  render() {
    let status = this.props.status;
    let text = i18n.savings;
    let yrs = years(status);
    let inflation = toFraction(status.inflation);
    let fiSavings = formattedCurrency(compound(status.savings, inflation, yrs));

    return (
      <FICard
        chart={{
          type: BarChart,
          fn: FICard.chartFn('savings', status),
          formatter: { x: longCurrency },
          text: i18n.savings.chart
        }}
        input={{ type: Currency, onChange: this.props.onChange }}
        rangeInfo={meta.savings}
        name="savings"
        text={{
          title: text.title,
          supporting: text.supporting,
          error: i18n.error.between(meta.savings.min, meta.savings.max),
          placeholder: text.placeholder(fiSavings)
        }}
        status={status} />
    );
  }
}
