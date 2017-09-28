import React from 'react';
import { identity } from 'ramda';
import { toModel } from 'service/chart';

const Chart = ({ type, plot, text, formatter = {}, chartOptions = {} }) => {
  const { xlabel, ylabel, legend, title, tooltips } = text;
  const xval = plot.x;
  const yval = plot.y;
  const data = toModel(xval, yval, legend);

  const options = {
    ...chartOptions,
    title: {
      display: false,
      text: title,
    },
    tooltips: {
      callbacks: tooltips,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: formatter.y,
          },
        },
      ],
      xAxes: [
        {
          ticks: { callback: formatter.x || identity },
        },
      ],
    },
  };

  return React.createElement(type, { data, xlabel, ylabel, options });
};

export default Chart;
