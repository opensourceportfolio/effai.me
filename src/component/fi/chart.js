import React from 'lib/react';
import { xrange, yrange, toModel } from 'service/chart';

const FICard = ({ type, fn, formatter, text, value, rangeInfo, chartOptions = {} }) => {
  const { xlabel, ylabel } = text;
  const xval = xrange(value, rangeInfo);
  const yval = yrange(xval, rangeInfo, fn);
  const data = toModel(xval, yval, rangeInfo.legend);

  if (formatter) {
    const identity = (e) => e;

    chartOptions.axisX = { labelInterpolationFnc: formatter.x || identity };
    chartOptions.axisY = { labelInterpolationFnc: formatter.y || identity };
  }

  return (
    React.createElement(type, { data, xlabel, ylabel, options: chartOptions })
  );
};

export default FICard;
