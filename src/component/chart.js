import React from 'lib/react';
import Chartist from 'lib/chartist';

export class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {type: this._capitalize(this.props.type)};
  }

  componentDidMount() {
    var type = this._capitalize(this.props.type);
    var $chart = React.findDOMNode(this.refs.chart);

    require(['lib/chartist/axisTitle'], () => {

      this.chart = new Chartist[type]($chart, this.props.data, {
        height: 300,
        chartPadding: {
          bottom: 20
        },
        axisY: {
          labelInterpolationFnc: function(value) {
            if (value > 0) {
              var e = parseInt(Math.log(value) / Math.log(1000)),
                extension = ['', 'k', 'M', 'B', 'T'];

              return  (value / Math.pow(1000, e)).toFixed(0) + extension[e];
            } else {
              return value;
            }
          }
        },
        plugins: [
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: this.props.xlabel,
              axisClass: '',
              offset: {
                x: 0,
                y: 40
              },
              textAnchor: 'middle'
            },
            axisY: {
              axisTitle: this.props.ylabel,
              axisClass: '',
              offset: {
                x: 0,
                y: 0
              },
              flipTitle: false
            }
          })
        ]
      });
    });
  }

  componentDidUpdate() {
    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      this.chart.update(this.props.data);
    }.bind(this), 250);
  }

  _capitalize(s)
  {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  render() {
    return (
      <div className="ct-chart" ref="chart"></div>
    );
  }
}
