import React from 'lib/react';
import { toModel } from 'service/chart';

const FICard = ({ type, plot, formatter, text, chartOptions = {} }) => {
  const { xlabel, ylabel, legend } = text;
  const xval = plot.x;
  const yval = plot.y;
  const data = toModel(xval, yval, legend);

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
