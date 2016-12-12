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
      this.chart.update();
    }, 350);
  }

  componentDidMount() {
    const $chart = this.refs.chart;
    const { data, type, options } = this.props;

    ChartJS.plugins.register(ChartDeferred);
    this.chart = new ChartJS($chart, {
      type,
      data,
      options,
    });
  }

  componentDidUpdate() {
    this.update();
  }

  render() {
    return (
      <canvas width="400" height="400" ref="chart"></canvas>
    );
  }

  static options(override) {
    return Object.assign({
      title: {
        display: true,
      },
      deferred: {
        enabled: true
      },
    }, {
    }, override);
  }
}
