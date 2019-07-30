import Currency from 'component/form/currency';
import { FormInputs } from 'model/state';
import React from 'react';
import { formattedCurrency } from 'service/formatter';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  livingExpenses: number;
  livingExpensesAtFI: number;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function LivingExpenses(props: Props) {
  const { livingExpenses, livingExpensesAtFI, onChange } = props;
  const onChangeHandler = (_, value: string) =>
    onChange({ livingExpenses: value });
  const text = {
    placeholder: i18n.future.livingExpenses.placeholder,
    additional: i18n.future.livingExpenses.additional(
      formattedCurrency(livingExpensesAtFI),
    ),
    error: i18n.error.between(meta.livingExpenses.min, meta.livingExpenses.max),
  };

  return (
    <Currency
      classes={['page__span--2']}
      name="livingExpenses"
      onChange={onChangeHandler}
      text={text}
      value={livingExpenses}
      rangeInfo={meta.livingExpenses}
    />
  );
}
