import React from 'react';

import Currency from '../../../component/form/currency';
import { FormInputs } from '../../../model/state';
import { i18n } from '../../../service/i18n';
import { meta } from '../../../service/meta';

interface StateProps {
  price: number;
  priceAtFI: number;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Price(props: Props) {
  const { price, priceAtFI, onChange } = props;
  const onChangeHandler = (_, value: string) => onChange({ price: value });
  const text = {
    placeholder: i18n.house.price.placeholder,
    additional: i18n.house.houseGrowth.additional(priceAtFI),
    error: i18n.error.between(meta.house.price.min, meta.house.price.max),
  };

  return (
    <Currency
      name="price"
      onChange={onChangeHandler}
      text={text}
      value={price}
      rangeInfo={meta.house.price}
    />
  );
}
