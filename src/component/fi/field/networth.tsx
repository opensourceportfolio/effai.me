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

export default function Networth(props: Props) {
  const { inputs, onChange } = props;
  const yrs = years(inputs);
  const finalNetWorth = formattedCurrency(
    compound(inputs.networth, inputs.inflation, yrs),
  );
  const onChangeHandler = (_, value: string) => onChange({ networth: value });
  const text = {
    placeholder: i18n.financial.networth.placeholder,
    additional: i18n.financial.networth.additional(finalNetWorth),
    error: i18n.error.between(meta.networth.min, meta.networth.max),
  };

  return (
    <Currency
      name="networth"
      onChange={onChangeHandler}
      text={text}
      classes={['page__span--2']}
      value={inputs.networth}
      rangeInfo={meta.networth}
    />
  );
}
