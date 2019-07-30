import { Percent as PercentModel } from 'model/percent';
import React from 'react';

import { FormInputs } from '../../../model/state';
import { percentage } from '../../../service/calculator';
import { i18n } from '../../../service/i18n';
import { meta } from '../../../service/meta';
import Percent from '../../form/percent';

interface StateProps {
  price: number;
  propertyTax: PercentModel;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function PropertyTax(props: Props) {
  const { price, propertyTax, onChange } = props;
  const futurePropertyTax = percentage(price, propertyTax);
  const onChangeHandler = (_, value: string) =>
    onChange({ propertyTax: value });
  const text = {
    placeholder: i18n.house.propertyTax.placeholder,
    additional: i18n.house.propertyTax.additional(futurePropertyTax),
    error: i18n.error.between(
      meta.house.propertyTax.min,
      meta.house.propertyTax.max,
    ),
  };

  return (
    <Percent
      name="propertyTax"
      onChange={onChangeHandler}
      text={text}
      value={propertyTax}
      rangeInfo={meta.house.propertyTax}
    />
  );
}
