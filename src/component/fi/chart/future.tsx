import BarChart from 'component/chart/bar';
import { FormInputs } from 'model/state';
import React from 'react';
import { chartFn, xrange, yrange } from 'service/chart';
import { formattedShortFloat, longCurrency } from 'service/formatter';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  inputs: FormInputs;
}

type Props = StateProps;

export default function Future({ inputs }: Props) {
  const text = i18n.future;
  const fn = chartFn(inputs, (formInputs, value: string | number) => ({
    ...formInputs,
    livingExpenses: value.toString(),
  }));
  const rangeInfo = meta.livingExpenses;
  const x = xrange(parseFloat(inputs.livingExpenses), rangeInfo);
  const y = yrange(x, fn);
  const formatted2DecimalPoints = (val: number) => formattedShortFloat(2, val);

  return (
    <BarChart
      plot={{ x, y }}
      text={text.chart}
      formatter={{ x: longCurrency, y: formatted2DecimalPoints }}
    />
  );
}
