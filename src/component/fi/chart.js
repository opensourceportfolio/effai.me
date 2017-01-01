import React from 'lib/react';
import { toModel } from 'service/chart';

const Chart = ({ type, plot, text, formatter = {}, chartOptions = {} }) => {
  const { xlabel, ylabel, legend, title, tooltips } = text;
  const xval = plot.x;
  const yval = plot.y;
  const data = toModel(xval, yval, legend);
  const identity = (e) => e;
  const chartColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(255, 205, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(231,233,237, 0.5)'
  ];
  const options = Object.assign({}, chartOptions, {
    title: {
      display: true,
      text: title,
    },
    tooltips: {
      callbacks: tooltips
    },
    scales: {
      yAxes: [{
        ticks: {
          callback: formatter.y,
        },
      }],
      xAxes: [{
        ticks: { callback: formatter.x || identity },
      }],
    }
  });

  data.datasets.forEach((dataset, i) => {
    dataset.backgroundColor = chartColors[i];
  });

  return (
    React.createElement(type, { data, xlabel, ylabel, options })
  );
};

export default Chart;
