import React from 'lib/react';
import Chartist from 'lib/chartist';
import 'lib/chartist/dist/chartist.css';
import 'lib/chartist-axistitle';
import 'lib/chartist-legend';
import ChartBase from 'component/chart';

export default class Line extends React.Component {

  animate(chart, data, previousOptions, duration) {
    if (data.type === 'line') {

      const previousPoint = data.path.clone().scale(1, 0).translate(0, data.chartRect.height());

      data.element.animate({
        d: {
          dur: duration,
          from: previousPoint.stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint,
        },
      });
    }
  }

  render() {
    const data = this.props.data;
    const options = ChartBase.options(this.props.options);

    options.plugins.push(Chartist.plugins.legend());

    const axis = ChartBase.axis;

    axis.axisX.axisTitle = this.props.xlabel;
    axis.axisY.axisTitle = this.props.ylabel;

    options.plugins.push(Chartist.plugins.ctAxisTitle(axis));

    return (
      <ChartBase type={Chartist.Line} data={data} options={options} ondraw={this.animate} />
    );
  }

}
