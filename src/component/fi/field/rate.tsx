import { Percent as PercentModel } from 'model/percent';
import React from 'react';

import { FormInputs } from '../../../model/state';
import { i18n } from '../../../service/i18n';
import { meta } from '../../../service/meta';
import Percent from '../../form/percent';

interface StateProps {
  payment: number;
  rate: PercentModel;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Rate(props: Props) {
  const { payment, rate, onChange } = props;

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
      value={rate}
      rangeInfo={meta.house.rate}
    />
  );
}
