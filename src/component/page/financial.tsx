import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import BarChart, { Props as BarProps } from 'component/chart/bar';
import Page from 'component/fi/page';
import Currency, { Props as CurrencyProps } from 'component/form/currency';
import Percent, { Props as PercentProps } from 'component/form/percent';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getInputs } from 'reducer/fi';
import { Dispatch } from 'redux';
import { compound, totalNetworth, years } from 'service/calculator';
import { chartFn, xrange, yrange } from 'service/chart';
import {
  formattedCurrency,
  formattedShortFloat,
  longCurrency,
} from 'service/formatter';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange: (payload: Partial<FormInputs>) => dispatch(changeValue(payload)),
});

const Financial = ({ inputs, onChange }: Props) => {
  const text = i18n.financial;
  const yrs = years(inputs);

  const fn = chartFn(inputs, (formInputs, value: string | number) => ({
    ...formInputs,
    savings: value.toString(),
  }));
  const rangeInfo = meta.savings;
  const x = xrange(parseFloat(inputs.savings), rangeInfo);
  const y = yrange(x, fn);
  const formatted2DecimalPoints = (val: number) => formattedShortFloat(2, val);
  const chart: BarProps = {
    plot: { x, y },
    text: text.chart,
    formatter: { x: longCurrency, y: formatted2DecimalPoints },
  };

  const fiSavings = formattedCurrency(
    compound(inputs.savings, inputs.inflation, yrs),
  );
  const savings: CurrencyProps = {
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

  const ror: PercentProps = {
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
  const networthInput: CurrencyProps = {
    name: 'networth',
    onChange: (_, value) => onChange({ networth: value }),
    text: {
      placeholder: text.networth.placeholder,
      additional: text.networth.additional(fiNetworth),
      error: i18n.error.between(meta.networth.min, meta.networth.max),
    },
    classes: ['page__span--2'],
    value: inputs.networth,
    rangeInfo: meta.networth,
  };

  return (
    <Page>
      <Paper className="page__input page__split--2">
        <Currency {...savings} />
        <Percent {...ror} />
        <Currency {...networthInput} />
      </Paper>
      <Paper className="page__media">
        <BarChart {...chart} />
      </Paper>
    </Page>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Financial);
