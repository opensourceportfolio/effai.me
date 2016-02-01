import Chartist from 'lib/chartist';
import 'lib/chartist/axisTitle';
import Chart from 'component/chart/index';

export default class BarChart {

  constructor(options) {
    this.options = Chart.options(options);

    return this;
  }

  build($chart, data) {
    this.chart = new Chartist.Bar($chart, data, this.options);
    this._previousData = data;

    return this;
  }

  setLegend() {
    // no implementation yet
    return this;
  }

  setAxisLabels(xlabel, ylabel) {
    let axis = Chart.axis;

    axis.axisX.axisTitle = xlabel;
    axis.axisY.axisTitle = ylabel;

    this.options.plugins.push(Chartist.plugins.ctAxisTitle(axis));

    return this;
  }

  animate() {
    this.chart.on('draw', (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: {
            dur: this.options.duration,
            from: this._previousData.series[0].data[data.index],
            to: data.y2,
            easing: Chartist.Svg.Easing.easeOutQuint
          },
        });
      }
    });

    return this;
  }

  update(data) {
    this.chart.update(data);

    return this;
  }

}
