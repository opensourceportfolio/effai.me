import Percent from 'component/form/percent';
import { Percent as PercentModel } from 'model/percent';
import { FormInputs } from 'model/state';
import React from 'react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  inflation: PercentModel;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Inflation(props: Props) {
  const { inflation, onChange } = props;
  const onChangeHandler = (_, value: string) => onChange({ inflation: value });
  const text = {
    placeholder: i18n.future.inflation.placeholder,
    error: i18n.error.between(meta.inflation.min, meta.inflation.max),
  };

  return (
    <Percent
      name="inflation"
      onChange={onChangeHandler}
      text={text}
      value={inflation}
      rangeInfo={meta.inflation}
    />
  );
}
