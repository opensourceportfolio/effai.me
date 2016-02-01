import React from 'lib/react';
import $ from 'lib/jquery';
import 'lib/chartist/axisTitle';
import 'lib/chartist/legend';

export default class Chart extends React.Component {

  componentDidMount() {
    let $chart = this.refs.chart;
    let ChartType = this.props.type;

    if (ChartType) {
      this.chart = new ChartType(this.props.options)
                    .setLegend()
                    .setAxisLabels(this.props.xlabel, this.props.ylabel)
                    .build($chart, this.props.data)
                    .animate()
                    ;
    }
  }

  componentDidUpdate() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.chart.update(this.props.data);
    }, 250);
  }

  render() {
    return (
      <div className="ct-chart ct-perfect-fourth" ref="chart"></div>
    );
  }

  static get axis() {
    return $.extend({}, {
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
    });
  }

  static options(override) {
    return $.extend({}, {
      duration: 1000,
      chartPadding: {
        bottom: 20,
      },
      plugins: [],
    }, override);
  }
}
