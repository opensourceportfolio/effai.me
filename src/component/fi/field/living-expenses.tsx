import Currency from 'component/form/currency';
import { FormInputs } from 'model/state';
import React from 'react';
import { compound, years } from 'service/calculator';
import { formattedCurrency } from 'service/formatter';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function LivingExpenses(props: Props) {
  const { inputs, onChange } = props;
  const yrs = years(inputs);
  const futureLivingExpenses = formattedCurrency(
    compound(inputs.livingExpenses, inputs.inflation, yrs),
  );
  const onChangeHandler = (_, value: string) =>
    onChange({ livingExpenses: value });
  const text = {
    placeholder: i18n.future.livingExpenses.placeholder,
    additional: i18n.future.livingExpenses.additional(futureLivingExpenses),
    error: i18n.error.between(meta.livingExpenses.min, meta.livingExpenses.max),
  };

  return (
    <Currency
      classes={['page__span--2']}
      name="livingExpenses"
      onChange={onChangeHandler}
      text={text}
      value={inputs.livingExpenses}
      rangeInfo={meta.livingExpenses}
    />
  );
}
