import Percent from 'component/form/percent';
import { FormInputs } from 'model/state';
import React from 'react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function ROR(props: Props) {
  const { inputs, onChange } = props;
  const text = {
    placeholder: i18n.financial.ror.placeholder,
    error: i18n.error.between(meta.ror.min, meta.ror.max),
  };
  const onChangeHandler = (_, value: string) => onChange({ ror: value });

  return (
    <Percent
      name="ror"
      onChange={onChangeHandler}
      text={text}
      value={inputs.ror}
      rangeInfo={meta.ror}
    />
  );
}
