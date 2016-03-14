import React from 'lib/react';
import {i18n} from 'service/i18n';
import {meta} from 'service/meta';
import {formattedCurrency, longCurrency} from 'service/formatter';
import {years, toFraction, compound} from 'service/calculator';
import {chartFn} from 'service/chart';
import Card from 'component/fi/card';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

const Goal = (props) => {
  let status = props.status;
  let text = i18n.goal;
  let yrs = years(status);
  let inflation = toFraction(status.inflation);
  let fiGoal = formattedCurrency(compound(status.goal, inflation, yrs));

  return (
    <Card chart={{
      type: BarChart,
      fn: chartFn('goal', status),
      formatter: {
        x: longCurrency
      },
      text: i18n.goal.chart
    }} input={{
      type: Currency,
      onChange: props.onChange
    }} rangeInfo={meta.goal} name="goal" text={{
      title: text.title,
      supporting: text.supporting,
      error: i18n.error.between(meta.goal.min, meta.goal.max),
      placeholder: text.placeholder(fiGoal)
    }} status={status}/>
  );
};

export default Goal;
