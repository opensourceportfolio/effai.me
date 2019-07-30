import { Percent as PercentModel } from 'model/percent';
import React from 'react';

import { FormInputs } from '../../../model/state';
import { i18n } from '../../../service/i18n';
import { meta } from '../../../service/meta';
import Percent from '../../form/percent';

interface StateProps {
  houseGrowth: PercentModel;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function HouseGrowth(props: Props) {
  const { houseGrowth, onChange } = props;
  const onChangeHandler = (_, value: string) =>
    onChange({ houseGrowth: value });
  const text = {
    placeholder: i18n.house.houseGrowth.placeholder,
    error: i18n.error.between(
      meta.house.houseGrowth.min,
      meta.house.houseGrowth.max,
    ),
  };

  return (
    <Percent
      name="houseGrowth"
      onChange={onChangeHandler}
      text={text}
      value={houseGrowth}
      rangeInfo={meta.house.houseGrowth}
    />
  );
}
