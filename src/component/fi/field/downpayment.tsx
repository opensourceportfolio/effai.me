import { Percent as PercentModel } from 'model/percent';
import React from 'react';

import { FormInputs } from '../../../model/state';
import { i18n } from '../../../service/i18n';
import { meta } from '../../../service/meta';
import Percent from '../../form/percent';

interface StateProps {
  downpayment: PercentModel;
  downpaymentAmount: number;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Downpayment(props: Props) {
  const { downpayment, downpaymentAmount, onChange } = props;
  const onChangeHandler = (_, value: string) =>
    onChange({ downpayment: value });
  const text = {
    placeholder: i18n.house.downpayment.placeholder,
    additional: i18n.house.downpayment.additional(downpaymentAmount),
    error: i18n.error.between(
      meta.house.downpayment.min,
      meta.house.downpayment.max,
    ),
  };

  return (
    <Percent
      name="downpayment"
      onChange={onChangeHandler}
      text={text}
      value={downpayment}
      rangeInfo={meta.house.downpayment}
    />
  );
}
