import React from 'lib/react';
import $ from 'lib/jquery';
import 'lib/chartist/axisTitle';
import 'lib/chartist/legend';

export class Chart extends React.Component {

  componentDidMount() {
    let $chart = React.findDOMNode(this.refs.chart);
    let ChartType = this.props.chartType;

    if (ChartType) {
      this.chart = new ChartType($chart)
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
      <div className="ct-chart" ref="chart"></div>
    );
  }

  static _labelInterpolationFnc(value) {
    if (value > 0) {
      let e = parseInt(Math.log(value) / Math.log(1000)),
        extension = ['', 'k', 'M', 'B', 'T'];

      return (value / Math.pow(1000, e)).toFixed(0) + extension[e];
    } else {
      return value;
    }
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

  static get options() {
    return $.extend({}, {
      duration: 1000,
      height: 300,
      chartPadding: {
        bottom: 20,
      },
      axisY: {
        labelInterpolationFnc: Chart._labelInterpolationFnc,
      },
      plugins: [],
    });
  }
}
