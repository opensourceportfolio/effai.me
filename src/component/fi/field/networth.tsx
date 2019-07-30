import Currency from 'component/form/currency';
import { FormInputs } from 'model/state';
import React from 'react';
import { formattedCurrency } from 'service/formatter';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  networth: number;
  liquidNetworthAtFI: number;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Networth(props: Props) {
  const { networth, liquidNetworthAtFI, onChange } = props;
  const onChangeHandler = (_, value: string) => onChange({ networth: value });
  const text = {
    placeholder: i18n.financial.networth.placeholder,
    additional: i18n.financial.networth.additional(
      formattedCurrency(liquidNetworthAtFI),
    ),
    error: i18n.error.between(meta.networth.min, meta.networth.max),
  };

  return (
    <Currency
      name="networth"
      onChange={onChangeHandler}
      text={text}
      classes={['page__span--2']}
      value={networth}
      rangeInfo={meta.networth}
    />
  );
}
