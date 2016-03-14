import React from 'lib/react';

export default class Chart extends React.Component {

  componentDidMount() {
    let $chart = this.refs.chart;
    let { options, data, ondraw } = this.props;
    let ChartType = this.props.type;

    this.chart = new ChartType($chart, data, options);

    this.chart.on('draw', (e) => {
      ondraw(this.chart, e, this._previousData, 1000);
    });
  }

  componentDidUpdate() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._previousData = this.chart.data;
      this.chart.update(this.props.data);
    }, 250);
  }

  render() {
    return (
      <div className="ct-chart ct-perfect-fourth" ref="chart"></div>
    );
  }

  static get axis() {
    return {
      axisX: {
        axisTitle: '',
        axisClass: '',
        offset: {
          x: 0,
          y: 40,
        },
        textAnchor: 'middle',
      },
      axisY: {
        axisTitle: '',
        axisClass: '',
        offset: {
          x: 0,
          y: 0,
        },
        flipTitle: false,
      },
    };
  }

  static options(override) {
    return Object.assign({}, {
      chartPadding: {
        bottom: 20,
      },
      plugins: [],
    }, override);
  }
}
