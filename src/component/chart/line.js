import React from 'lib/react';
import Chartist from 'lib/chartist';
import 'lib/chartist/axisTitle';
import 'lib/chartist/legend';
import ChartBase from 'component/chart/index';

export default class Line extends React.Component {

  animate(chart, data, previousOptions, duration) {
    let previousPoint;

    if (data.type === 'line') {

      previousPoint = data.path.clone().scale(1, 0).translate(0, data.chartRect.height());

      data.element.animate({
        d: {
          dur: duration,
          from: previousPoint.stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    }
  }

  render() {
    let data = this.props.data;
    let options = ChartBase.options(this.props.options);

    options.plugins.push(Chartist.plugins.legend());

    let axis = ChartBase.axis;

    axis.axisX.axisTitle = this.props.xlabel;
    axis.axisY.axisTitle = this.props.ylabel;

    options.plugins.push(Chartist.plugins.ctAxisTitle(axis));

    return (
      <ChartBase type={Chartist.Line} data={data} options={options} ondraw={this.animate} />
    );
  }

}
