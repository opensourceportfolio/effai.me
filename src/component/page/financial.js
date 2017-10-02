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
import { getInputs } from 'reducer/fi';
import { Row, Column, Column2 } from 'component/grid';
import Page from 'component/fi/page';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';

const mapStateToProps = state => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = {
  onChange: changeValue,
};

const Financial = ({ inputs, onChange }) => {
  const text = i18n.financial;
  const yrs = years(inputs);

  const fn = chartFn('savings', inputs);
  const rangeInfo = meta.savings;
  const x = xrange(inputs.savings, rangeInfo);
  const y = yrange(x, rangeInfo, fn);
  const formatted2DecimalPoints = val => formattedShortFloat(2, val);
  const chart = {
    type: BarChart,
    plot: { x, y },
    text: text.chart,
    formatter: { x: longCurrency, y: formatted2DecimalPoints },
  };

  const fiSavings = formattedCurrency(
    compound(inputs.savings, inputs.inflation, yrs),
  );
  const savings = {
    name: 'savings',
    onChange,
    text: {
      placeholder: text.savings.placeholder,
      additional: text.savings.additional(fiSavings),
      error: i18n.error.between(meta.savings.min, meta.savings.max),
    },
    value: inputs.savings,
    rangeInfo: meta.savings,
  };

  const ror = {
    name: 'ror',
    onChange,
    text: {
      placeholder: text.ror.placeholder,
      error: i18n.error.between(meta.ror.min, meta.ror.max),
    },
    value: inputs.ror,
    rangeInfo: meta.ror,
  };

  const fiNetworth = formattedCurrency(investment(inputs, yrs));
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
    value: inputs.networth,
    rangeInfo: meta.networth,
  };

  return (
    <Page title={text.title} supporting={text.supporting} chart={chart}>
      <Row>
        <Column2>
          <Currency {...savings} />
        </Column2>
        <Column2>
          <Percent {...ror} />
        </Column2>
      </Row>
      <Row>
        <Column>
          <Currency {...networthInput} />
        </Column>
      </Row>
    </Page>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Financial);
