import React from 'lib/react';
import $ from 'lib/jquery';
import { years } from 'service/calculator';
import { xrange, yrange, toModel } from 'service/chart';
import Card from 'component/mdl/card/index';
import CardAction from 'component/mdl/card/cardAction';
import CardMedia from 'component/mdl/card/cardMedia';
import CardSupporting from 'component/mdl/card/cardSupporting';
import CardTitle from 'component/mdl/card/cardTitle';

export default class FICard extends React.Component {

  render() {
    let chartOptions = {};
    let { name, text, chart, rangeInfo } = this.props;
    let value = this.props.status[name];
    let { type, onChange } = this.props.input;

    let { xlabel, ylabel } = chart.text;
    let chartValue = chart.value == null ? value : chart.value;
    let chartRangeInfo = chart.rangeInfo ? chart.rangeInfo : rangeInfo;
    let xval = xrange(chartValue, chartRangeInfo);
    let yval = yrange(xval, chartRangeInfo, chart.fn);
    let data = toModel(xval, yval, chartRangeInfo.legend);

    if (chart.formatter) {
      let identity = (e) => e;

      chartOptions.axisX = { labelInterpolationFnc: chart.formatter.x || identity };
      chartOptions.axisY = { labelInterpolationFnc: chart.formatter.y || identity };
    }

    return (
      <Card>
        <CardTitle text={text.title} />
        <CardSupporting text={text.supporting} />
        <CardMedia>
          {React.createElement(chart.type, { data, xlabel, ylabel, options: chartOptions })}
        </CardMedia>
        <CardAction>
          {React.createElement(type, { name, onChange, text, value, rangeInfo })}
        </CardAction>
      </Card>
    );
  }

  static chartFn(name, state) {
    let stateCopy = $.extend({}, state);

    return (e) => {
      stateCopy[name] = e;
      return years(stateCopy);
    };
  }
}
