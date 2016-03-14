import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { years, networth, toFraction, compound, monthlyYield } from 'service/calculator';
import { formattedCurrency, longCurrency } from 'service/formatter';
import Card from 'component/fi/card';
import LineChart from 'component/chart/line';
import Currency from 'component/form/currency';

const Networth = (props) => {
  let status = props.status;
  let yrs = years(status);
  let fiNetworth = formattedCurrency(networth(status, yrs));
  let min = 0;
  let max = Math.min(yrs + 7, meta.range);
  let step = Math.min((yrs + 7) / 7, 7);
  let text = i18n.networth;

  let compoundFn = (v) => {
    let inflation = toFraction(status.inflation);

    return compound(status.goal, inflation, parseFloat(v));
  };

  return (
    <Card
      chart={{
        type: LineChart,
        value: 0,
        rangeInfo: { min, max, step, legend: i18n.networth.chart.legend },
        fn: [(v) => monthlyYield(status, parseFloat(v)), compoundFn],
        formatter: {  y: longCurrency },
        text: i18n.networth.chart
      }}
      input={{ type: Currency, onChange: props.onChange }}
      rangeInfo={meta.networth}
      name="networth"
      text={{
        title: text.title,
        supporting: text.supporting,
        error: i18n.error.between(meta.networth.min, meta.networth.max),
        placeholder: text.placeholder(fiNetworth)
      }}
      status={status} />
  );
};

export default Networth;
