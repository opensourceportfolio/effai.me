import React from 'react';
import { connect } from 'react-redux';
import { changeValue } from 'action/fi';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import {
  formattedCurrency,
  longCurrency,
  formattedShortFloat,
} from 'service/formatter';
import { years, compound, investment } from 'service/calculator';
import { xrange, yrange, chartFn } from 'service/chart';
import { Row, Column } from 'component/grid';
import ChartCard from 'component/fi/chart-card';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';

const mapStateToProps = state => ({
  status: state.input,
});

const mapDispatchToProps = {
  onChange: changeValue,
};

const Financial = ({ status, onChange }) => {
  const text = i18n.financial;
  const yrs = years(status);

  const fn = chartFn('savings', status);
  const rangeInfo = meta.savings;
  const x = xrange(status.savings, rangeInfo);
  const y = yrange(x, rangeInfo, fn);
  const formatted2DecimalPoints = val => formattedShortFloat(2, val);
  const chart = {
    type: BarChart,
    plot: { x, y },
    text: text.chart,
    formatter: { x: longCurrency, y: formatted2DecimalPoints },
  };

  const fiNetworth = formattedCurrency(investment(status, yrs));
  const networthInput = {
    name: 'networth',
    onChange,
    inputProps: {
      autoFocus: true,
    },
    text: {
      placeholder: text.networth.placeholder,
      additional: text.networth.additional(fiNetworth),
      error: i18n.error.between(meta.networth.min, meta.networth.max),
    },
    value: status.networth,
    rangeInfo: meta.networth,
  };

  const fiSavings = formattedCurrency(
    compound(status.savings, status.inflation, yrs),
  );
  const savings = {
    name: 'savings',
    onChange,
    text: {
      placeholder: text.savings.placeholder,
      additional: text.savings.additional(fiSavings),
      error: i18n.error.between(meta.savings.min, meta.savings.max),
    },
    value: status.savings,
    rangeInfo: meta.savings,
  };

  const ror = {
    name: 'ror',
    onChange,
    text: {
      placeholder: text.ror.placeholder,
      error: i18n.error.between(meta.ror.min, meta.ror.max),
    },
    value: status.ror,
    rangeInfo: meta.ror,
  };

  return (
    <ChartCard title={text.title} supporting={text.supporting} chart={chart}>
      <Row>
        <Column>
          <Currency {...networthInput} />
        </Column>
        <Column>
          <Currency {...savings} />
        </Column>
      </Row>
      <Percent {...ror} />
    </ChartCard>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Financial);
