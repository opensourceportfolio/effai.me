import React from 'lib/react';
import Chartist from 'lib/chartist';
import 'lib/shim/chartist/axisTitle';

export class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {type: this._capitalize(this.props.type)};
  }

  componentDidMount() {
    var type = this._capitalize(this.props.type);
    var $chart = React.findDOMNode(this.refs.chart);

    require(['lib/chartist-plugin-axistitle'], () => {

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

      this.chart.on('draw', function(data) {
        if(data.type === 'bar') {
          data.element.animate({
            y2: {
              dur: 1000,
              from: data.y1,
              to: data.y2,
              easing: Chartist.Svg.Easing.easeOutQuint
            },
            opacity: {
              dur: 1000,
              from: 0,
              to: 1,
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'line') {
          data.element.animate({
            d: {
              begin: 750 * data.index,
              dur: 750,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        }
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
