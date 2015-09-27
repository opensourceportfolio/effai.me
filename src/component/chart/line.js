import Chartist from 'lib/chartist';
import 'lib/chartist/axisTitle';
import {Chart} from 'component/chart/index';

export class LineChart {

  constructor() {
    this.options = Chart.options;
    this._previousPath = [];

    return this;
  }

  build($chart, data) {
    this.chart = new Chartist.Line($chart, data, this.options);

    return this;
  }

  setLegend() {
    this.options.plugins.push(Chartist.plugins.legend());

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
      if (data.type === 'line') {

        if (!this._previousPath[data.index]) {
          this._previousPath[data.index] = data.path.clone().scale(1, 0).translate(0, data.chartRect.height());
        }

        data.element.animate({
          d: {
            dur: this.options.duration,
            from: this._previousPath[data.index].stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });

        this._previousPath[data.index] = data.path;
      }
    });

    return this;
  }

  update(data) {
    this.chart.update(data);

    return this;
  }

}
