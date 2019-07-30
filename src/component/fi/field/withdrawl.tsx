import Percent from 'component/form/percent';
import { Percent as PercentModel } from 'model/percent';
import { FormInputs } from 'model/state';
import React from 'react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  withdrawl: PercentModel;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Withdrawl(props: Props) {
  const { withdrawl, onChange } = props;
  const onChangeHandler = (_, value: string) => onChange({ withdrawl: value });
  const text = {
    placeholder: i18n.future.withdrawl.placeholder,
    error: i18n.error.between(meta.withdrawl.min, meta.withdrawl.max),
  };

  return (
    <Percent
      name="withdrawl"
      onChange={onChangeHandler}
      text={text}
      value={withdrawl}
      rangeInfo={meta.withdrawl}
    />
  );
}
