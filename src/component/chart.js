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
    this.chart = new Chartist[type]($chart, this.props.data, {
      height: 300,
    });
  }

  componentDidUpdate() {
    this.chart.update(this.props.data);
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
