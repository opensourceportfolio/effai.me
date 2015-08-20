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
