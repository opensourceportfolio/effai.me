import React from "react";
import Chartjs from "chart.js";
import ChartDeferred from "chartjs-plugin-deferred";
import debounce from "debounce";

export default class Base extends React.Component {
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
    const $chart = this.chartEl;
    const { data, type, options } = this.props;
    const overridden = this.override(options);

    Chartjs.plugins.register(ChartDeferred);
    this.chart = new Chartjs($chart, {
      type,
      data,
      options: overridden
    });
  }

  componentDidUpdate() {
    this.update();
  }

  override(options) {
    return Object.assign(
      {
        maintainAspectRatio: false,
        title: {
          display: true
        },
        deferred: {
          enabled: true
        }
      },
      {},
      options
    );
  }

  render() {
    const defaultSize = { width: "500", height: "300" };
    const { size = defaultSize } = this.props.options;

    return (
      <canvas
        {...size}
        style={{ height: "100%" }}
        ref={e => (this.chartEl = e)}
      />
    );
  }
}
