// @flow

import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { changeValue } from 'action/fi';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import {
  formattedCurrency,
  longCurrency,
  formattedShortFloat,
} from 'service/formatter';
import { years, compound, totalNetworth } from 'service/calculator';
import { xrange, yrange, chartFn } from 'service/chart';
import { getInputs } from 'reducer/fi';
import Chart from 'component/fi/chart';
import { Row, Column, Column2 } from 'component/grid';
import Page from 'component/fi/page';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';
import type { State, FormInputs } from 'model/state';
import type { Dispatch } from 'model/redux';

type StateProps = {|
  inputs: FormInputs,
|};

type DispatchProps = {|
  onChange: (payload: $Shape<FormInputs>) => void,
|};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange: (payload: $Shape<FormInputs>) => dispatch(changeValue(payload)),
});

const Financial = ({ inputs, onChange }: Props) => {
  const text = i18n.financial;
  const yrs = years(inputs);

  const fn = chartFn(
    (formInputs, value) => (formInputs.savings = value),
    inputs,
  );
  const rangeInfo = meta.savings;
  const x = xrange(parseFloat(inputs.savings), rangeInfo);
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
    onChange: (_, value) => onChange({ savings: value }),
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
    onChange: (_, value) => onChange({ ror: value }),
    text: {
      placeholder: text.ror.placeholder,
      error: i18n.error.between(meta.ror.min, meta.ror.max),
    },
    value: inputs.ror,
    rangeInfo: meta.ror,
  };

  const fiNetworth = formattedCurrency(totalNetworth(inputs, yrs));
  const networthInput = {
    name: 'networth',
    onChange: (_, value) => onChange({ networth: value }),
    text: {
      placeholder: text.networth.placeholder,
      additional: text.networth.additional(fiNetworth),
      error: i18n.error.between(meta.networth.min, meta.networth.max),
    },
    value: inputs.networth,
    rangeInfo: meta.networth,
  };

  return (
    <Page>
      <Paper className="page__input" zDepth={1}>
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
      </Paper>
      <Paper className="page__media" zDepth={1}>
        <Chart {...chart} />
      </Paper>
    </Page>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Financial);
