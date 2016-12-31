import React from 'lib/react';
import ChartJS from 'lib/chartjs';
import ChartDeferred from 'lib/chartjs-deferred';
import debounce from 'lib/debounce';

export default class Chart extends React.Component {
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

  componentDidMount() {
    const $chart = this.refs.chart;
    const { data, type, options } = this.props;
    const overridden = this.override(options);

    ChartJS.plugins.register(ChartDeferred);
    this.chart = new ChartJS($chart, {
      type,
      data,
      options: overridden,
    });
  }

  componentDidUpdate() {
    this.update();
  }

  override(options) {
    return Object.assign({
      title: {
        display: true,
      },
      deferred: {
        enabled: true
      },
    }, {}, options);
  }

  render() {
    return (
      <canvas width="400" height="400" ref="chart"></canvas>
    );
  }
}
