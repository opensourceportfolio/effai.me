import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { formattedCurrency, longCurrency } from 'service/formatter';
import { years, toFraction, compound } from 'service/calculator';
import { chartFn } from 'service/chart';
import Card from 'component/fi/card';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

const Savings = (props) => {
  let status = props.status;
  let text = i18n.savings;
  let yrs = years(status);
  let inflation = toFraction(status.inflation);
  let fiSavings = formattedCurrency(compound(status.savings, inflation, yrs));

  return (
    <Card
      chart={{
        type: BarChart,
        fn: chartFn('savings', status),
        formatter: { x: longCurrency },
        text: i18n.savings.chart
      }}
      input={{ type: Currency, onChange: props.onChange }}
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
};

export default Savings;
