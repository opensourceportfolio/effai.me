import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import BarChart from 'component/chart/bar';
import Page from 'component/fi/page';
import Currency, { Props as CurrencyProps } from 'component/form/currency';
import Percent, { Props as PercentProps } from 'component/form/percent';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getInputs } from 'reducer/fi';
import { compound, years } from 'service/calculator';
import { chartFn, xrange, yrange } from 'service/chart';
import {
  formattedCurrency,
  formattedShortFloat,
  longCurrency,
} from 'service/formatter';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

import { ThunkDispatch } from '../../model/redux';

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

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  onChange: (payload: Partial<FormInputs>) => dispatch(changeValue(payload)),
});

const Future = ({ inputs, onChange }: Props) => {
  const text = i18n.future;
  const yrs = years(inputs);

  const fn = chartFn(inputs, (formInputs, value: string | number) => ({
    ...formInputs,
    livingExpenses: value.toString(),
  }));
  const rangeInfo = meta.livingExpenses;
  const x = xrange(parseFloat(inputs.livingExpenses), rangeInfo);
  const y = yrange(x, fn);
  const formatted2DecimalPoints = (val: number) => formattedShortFloat(2, val);
  const chart = {
    plot: { x, y },
    formatter: { x: longCurrency, y: formatted2DecimalPoints },
    text: text.chart,
  };

  const futureLivingExpenses = formattedCurrency(
    compound(inputs.livingExpenses, inputs.inflation, yrs),
  );
  const livingExpenses: CurrencyProps = {
    classes: ['page__span--2'],
    name: 'livingExpenses',
    onChange: (_, value) => onChange({ livingExpenses: value }),
    text: {
      placeholder: text.livingExpenses.placeholder,
      additional: text.livingExpenses.additional(futureLivingExpenses),
      error: i18n.error.between(
        meta.livingExpenses.min,
        meta.livingExpenses.max,
      ),
    },
    value: inputs.livingExpenses,
    rangeInfo: meta.livingExpenses,
  };

  const inflation: PercentProps = {
    name: 'inflation',
    onChange: (_, value) => onChange({ inflation: value }),
    text: {
      placeholder: text.inflation.placeholder,
      error: i18n.error.between(meta.inflation.min, meta.inflation.max),
    },
    value: inputs.inflation,
    rangeInfo: meta.inflation,
  };

  const withdrawl: PercentProps = {
    name: 'withdrawl',
    onChange: (_, value) => onChange({ withdrawl: value }),
    text: {
      placeholder: text.withdrawl.placeholder,
      error: i18n.error.between(meta.withdrawl.min, meta.withdrawl.max),
    },
    value: inputs.withdrawl,
    rangeInfo: meta.withdrawl,
  };

  return (
    <Page>
      <Paper className="page__input page__split--2">
        <Currency {...livingExpenses} />
        <Percent {...inflation} />
        <Percent {...withdrawl} />
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
)(Future);
