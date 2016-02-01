import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { formattedCurrency, longCurrency} from 'service/formatter';
import { years, toFraction, compound  } from 'service/calculator';
import FICard from 'component/fi/card/index';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

export default class Goal extends React.Component {

  render() {
    let status = this.props.status;
    let text = i18n.goal;
    let yrs = years(status);
    let inflation = toFraction(status.inflation);
    let fiGoal = formattedCurrency(compound(status.goal, inflation, yrs));

    return (
      <FICard
        chart={{
          type: BarChart,
          fn: FICard.chartFn('goal', status),
          formatter: { x: longCurrency },
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
