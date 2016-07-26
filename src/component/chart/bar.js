import React from 'lib/react';
import Chartist from 'lib/chartist';
import 'lib/chartist/axisTitle';
import ChartBase from 'component/chart';

export default class Bar extends React.Component {

  animate(chart, data, previousData, duration) {
    if (data.type === 'bar') {
      data.element.animate({
        y2: {
          dur: duration,
          from: previousData ? previousData.series[0].data[data.index] || 0 : 0,
          to: data.y2,
          easing: Chartist.Svg.Easing.easeOutQuint,
        },
      });
    }
  }

  render() {
    const data = this.props.data;
    const options = ChartBase.options(this.props.options);

    const axis = ChartBase.axis;

    axis.axisX.axisTitle = this.props.xlabel;
    axis.axisY.axisTitle = this.props.ylabel;

    options.plugins.push(Chartist.plugins.ctAxisTitle(axis));

    return (
      <ChartBase type={Chartist.Bar} data={data} options={options} ondraw={this.animate} />
    );
  }

}
