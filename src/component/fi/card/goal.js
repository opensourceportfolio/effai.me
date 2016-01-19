import React from 'lib/react';
import i18n from 'service/i18n';
import meta from 'service/meta';
import formatter from 'service/formatter';
import calculator from 'service/calculator';
import { FICard } from 'component/fi/card/index';
import { BarChart } from 'component/chart/bar';
import { Currency } from 'component/form/currency';

export class Goal extends React.Component {

  render() {
    let status = this.props.status;
    let text = i18n.goal;
    let years = calculator.calculate(status);
    let inflation = calculator.toFraction(status.inflation);
    let fiGoal = formatter.formattedCurrency(calculator.compound(status.goal, inflation, years));

    return (
      <FICard
        chart={{
          type: BarChart,
          fn: FICard.chartFn('goal', status),
          formatter: { x: formatter.longCurrency },
          text: i18n.goal.chart,
        }}
        input={{ type: Currency, onChange: this.props.onChange }}
        rangeInfo={meta.goal}
        name="goal"
        text={{
          title: text.title,
          supporting: text.supporting,
          placeholder: text.placeholder(fiGoal)
        }}
        status={status} />
    );
  }
}
