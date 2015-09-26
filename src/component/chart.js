import React from 'lib/react';
import Chartist from 'lib/chartist';
import 'lib/chartist/axisTitle';
import 'lib/chartist/legend';

export class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this._capitalize(this.props.type)
    };
  }

  componentDidMount() {
    let type = this._capitalize(this.props.type);
    let $chart = React.findDOMNode(this.refs.chart);
    let options = {
      duration: 1000,
      height: 300,
      chartPadding: {
        bottom: 20,
      },
      axisY: {
        labelInterpolationFnc: this._labelInterpolationFnc,
      },
      plugins: [],
    };

    if (this.props.data.series.length > 1) {
      options.plugins.push(Chartist.plugins.legend());
    }

    options.plugins.push(Chartist.plugins.ctAxisTitle({
      axisX: {
        axisTitle: this.props.xlabel,
        axisClass: '',
        offset: {
          x: 0,
          y: 40,
        },
        textAnchor: 'middle',
      },
      axisY: {
        axisTitle: this.props.ylabel,
        axisClass: '',
        offset: {
          x: 0,
          y: 0,
        },
        flipTitle: false,
      },
    }));

    this.chart = new Chartist[type]($chart, this.props.data, options);

    this.chart.on('draw', (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: {
            dur: options.duration,
            from: this._previousData.series[0][data.index],
            to: data.y2,
            easing: Chartist.Svg.Easing.easeOutQuint
          },
        });
      } else if (data.type === 'line') {
        if (!this._previousPath[data.index]) {
          this._previousPath[data.index] = data.path.clone().scale(1, 0).translate(0, data.chartRect.height());
        }
        data.element.animate({
          d: {
            dur: options.duration,
            from: this._previousPath[data.index].stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });

        this._previousPath[data.index] = data.path.clone();
      }
    });

    this._previousPath = [];
    this._previousData = this.props.data;

  }

  componentDidUpdate() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.chart.update(this.props.data);
    }, 250);
  }

  _capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  _labelInterpolationFnc(value) {
    if (value > 0) {
      let e = parseInt(Math.log(value) / Math.log(1000)),
        extension = ['', 'k', 'M', 'B', 'T'];

      return (value / Math.pow(1000, e)).toFixed(0) + extension[e];
    } else {
      return value;
    }
  }

  render() {
    return ( < div className = "ct-chart"
      ref = "chart" > < /div>
    );
  }
}
