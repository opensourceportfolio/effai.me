import React from 'react';

import { FormInputs } from '../../../model/state';
import { percentage } from '../../../service/calculator';
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

export default function Maintenance(props: Props) {
  const { inputs, onChange } = props;
  const futureMaintenance = percentage(inputs.price, inputs.maintenance);
  const onChangeHandler = (_, value: string) =>
    onChange({ maintenance: value });
  const text = {
    placeholder: i18n.house.maintenance.placeholder,
    additional: i18n.house.maintenance.additional(futureMaintenance),
    error: i18n.error.between(
      meta.house.maintenance.min,
      meta.house.maintenance.max,
    ),
  };

  return (
    <Percent
      name="maintenance"
      onChange={onChangeHandler}
      text={text}
      value={inputs.maintenance}
      rangeInfo={meta.house.maintenance}
    />
  );
}
