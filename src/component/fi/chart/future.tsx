import BarChart from 'component/chart/bar';
import { FutureData } from 'model/future-data';
import { HomeData } from 'model/home-data';
import { InvestmentData } from 'model/investment-data';
import React from 'react';
import { years } from 'service/calculator';
import { xrange, yrange } from 'service/chart';
import { formattedShortFloat, longCurrency } from 'service/formatter';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  investmentData: InvestmentData;
  homeData: HomeData;
  futureData: FutureData;
}

type Props = StateProps;

export default function Future({
  investmentData,
  homeData,
  futureData,
}: Props) {
  const text = i18n.future;
  const fn = (livingExpenses: number) =>
    years(investmentData, homeData, { ...futureData, livingExpenses });
  const rangeInfo = meta.livingExpenses;
  const x = xrange(futureData.livingExpenses, rangeInfo);
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
