import React from 'lib/react';
import { toModel } from 'service/chart';

const FICard = ({ type, plot, text, formatter = {}, opts = {} }) => {
  const { xlabel, ylabel, legend, title, tooltips } = text;
  const xval = plot.x;
  const yval = plot.y;
  const data = toModel(xval, yval, legend);
  const identity = (e) => e;
  const chartColors = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(231,233,237)'
  ];
  const options = Object.assign({}, opts, {
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
    <div>
      {React.createElement(type, { data, xlabel, ylabel, options })}
    </div>
  );
};

export default FICard;
