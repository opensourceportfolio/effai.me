import React from 'react';

import { FormInputs } from '../../../model/state';
import { pmt } from '../../../service/amortization';
import { percentage, toFraction } from '../../../service/calculator';
import { i18n } from '../../../service/i18n';
import { meta } from '../../../service/meta';
import Percent from '../../form/percent';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Rate(props: Props) {
  const { inputs, onChange } = props;
  const downpaymentAmount = percentage(inputs.price, inputs.downpayment);
  const payment = pmt(
    toFraction(parseFloat(inputs.rate) / 12),
    parseFloat(inputs.term) * 12,
    -parseFloat(inputs.price) + downpaymentAmount,
    0,
  );
  const onChangeHandler = (_, value: string) => onChange({ rate: value });
  const text = {
    placeholder: i18n.house.rate.placeholder,
    additional: i18n.house.rate.additional(payment),
    error: i18n.error.between(meta.house.rate.min, meta.house.rate.max),
  };

  return (
    <Percent
      name="rate"
      onChange={onChangeHandler}
      text={text}
      value={inputs.rate}
      rangeInfo={meta.house.rate}
    />
  );
}
