import React from 'react';

import Currency from '../../../component/form/currency';
import { FormInputs } from '../../../model/state';
import { compound, monthsToNow, years } from '../../../service/calculator';
import { i18n } from '../../../service/i18n';
import { meta } from '../../../service/meta';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Price(props: Props) {
  const { inputs, onChange } = props;
  const yrs = years(inputs) + monthsToNow(inputs.purchaseDate) / 12;

  const futurePrice = compound(inputs.price, inputs.houseGrowth, yrs);
  const onChangeHandler = (_, value: string) => onChange({ price: value });
  const text = {
    placeholder: i18n.house.price.placeholder,
    additional: i18n.house.houseGrowth.additional(futurePrice),
    error: i18n.error.between(meta.house.price.min, meta.house.price.max),
  };

  return (
    <Currency
      name="price"
      onChange={onChangeHandler}
      text={text}
      value={inputs.price}
      rangeInfo={meta.house.price}
    />
  );
}
