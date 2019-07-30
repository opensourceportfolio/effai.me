import Currency from 'component/form/currency';
import { FormInputs } from 'model/state';
import React from 'react';
import { formattedCurrency } from 'service/formatter';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  savings: number;
  fiSavings: number;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Savings(props: Props) {
  const { savings, fiSavings, onChange } = props;

  const onChangeHandler = (_, value: string) => onChange({ savings: value });
  const text = {
    placeholder: i18n.financial.savings.placeholder,
    additional: i18n.financial.savings.additional(formattedCurrency(fiSavings)),
    error: i18n.error.between(meta.savings.min, meta.savings.max),
  };

  return (
    <Currency
      name="savings"
      onChange={onChangeHandler}
      text={text}
      value={savings}
      rangeInfo={meta.savings}
    />
  );
}
