// @flow

import * as React from 'react';
import Chartjs from 'chart.js';
import debounce from 'debounce';
import { type Data } from 'model/chart';

type ChartOptions = {||};

export type Props = {
  data: Data,
  type: 'bar' | 'line',
  options: ChartOptions,
};
export default class Base extends React.Component<Props> {
  constructor() {
    super();
    this.update = debounce(() => {
      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.data = this.props.data.datasets[i].data;
      });
      this.chart.data.labels = this.props.data.labels;
      this.chart.update();
    }, 350);
  }

  update: () => void;

  chart: Chartjs;

  chartEl: ?HTMLCanvasElement;

  componentDidMount() {
    const $chart = this.chartEl;
    const { data, type, options } = this.props;
    const overridden = this.override(options);

    this.chart = new Chartjs($chart, {
      type,
      data,
      options: overridden,
    });
  }

  componentDidUpdate() {
    this.update();
  }

  override(options: ChartOptions) {
    return {
      maintainAspectRatio: false,
      title: {
        display: true,
      },
      deferred: {
        enabled: true,
      },
      ...options,
    };
  }

  render() {
    return <canvas style={{ height: '100%' }} ref={e => (this.chartEl = e)} />;
  }
}
