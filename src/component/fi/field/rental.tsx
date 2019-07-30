import Currency from 'component/form/currency';
import React from 'react';

import { FormInputs } from '../../../model/state';
import { i18n } from '../../../service/i18n';
import { meta } from '../../../service/meta';

interface StateProps {
  rent: number;
  rentAtFI: number;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Rental(props: Props) {
  const { rent, rentAtFI, onChange } = props;

  const onChangeHandler = (_, value: string) => onChange({ rental: value });
  const text = {
    placeholder: i18n.house.rental.placeholder,
    additional: i18n.house.rental.additional(rentAtFI),
    error: i18n.error.between(meta.house.rental.min, meta.house.rental.max),
  };

  return (
    <Currency
      name="rental"
      onChange={onChangeHandler}
      text={text}
      value={rent}
      rangeInfo={meta.house.rental}
    />
  );
}
