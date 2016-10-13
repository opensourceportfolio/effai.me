import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { formattedCurrency, longCurrency } from 'service/formatter';
import { years, compound } from 'service/calculator';
import { xrange, yrange, chartFn } from 'service/chart';
import ChartCard from 'component/fi/chart-card';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';

const Financial = ({status, onChange}) => {
  const text = i18n.future;
  const yrs = years(status);

  const fn = chartFn('goal', status);
  const rangeInfo = meta.goal;
  const x = xrange(status.goal, rangeInfo);
  const y = yrange(x, rangeInfo, fn);
  const chart = {
    type: BarChart,
    plot: {x, y},
    formatter: { x: longCurrency },
    text: text.chart,
  };

  const fiGoal = formattedCurrency(compound(status.goal, status.inflation, yrs));
  const goal = {
    name: 'goal',
    onChange,
    text: {
      error: i18n.error.between(meta.goal.min, meta.goal.max),
      placeholder: text.goal.placeholder(fiGoal),
    },
    value: status.goal,
    rangeInfo: meta.goal,
  };

  const inflation = {
    name: 'inflation',
    onChange,
    text: text.inflation,
    value: status.inflation,
    rangeInfo: meta.inflation,
  };

  const withdrawl = {
    name: 'withdrawl',
    onChange,
    text: text.withdrawl,
    value: status.withdrawl,
    rangeInfo: meta.withdrawl,
  };


  return (
    <ChartCard title={text.title} supporting={text.supporting} chart={chart}>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
          <Currency {...goal} />
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone">
          <Percent {...inflation} />
        </div>
        <div className="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone">
          <Percent {...withdrawl} />
        </div>
      </div>
    </ ChartCard>
  );
};

export default Financial;
