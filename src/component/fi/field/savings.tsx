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

export default function Savings(props: Props) {
  const { inputs, onChange } = props;
  const yrs = years(inputs);
  const fiSavings = formattedCurrency(
    compound(inputs.savings, inputs.inflation, yrs),
  );
  const onChangeHandler = (_, value: string) => onChange({ savings: value });
  const text = {
    placeholder: i18n.financial.savings.placeholder,
    additional: i18n.financial.savings.additional(fiSavings),
    error: i18n.error.between(meta.savings.min, meta.savings.max),
  };

  return (
    <Currency
      name="savings"
      onChange={onChangeHandler}
      text={text}
      value={inputs.savings}
      rangeInfo={meta.savings}
    />
  );
}
