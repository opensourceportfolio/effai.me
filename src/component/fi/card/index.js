import React from 'lib/react';
import $ from 'lib/jquery';
import Calculator from 'service/calculator';
import ChartService from 'service/chart';
import { Card } from 'component/card/index';
import { CardAction } from 'component/card/cardAction';
import { CardMedia } from 'component/card/cardMedia';
import { CardSupporting } from 'component/card/cardSupporting';
import { CardTitle } from 'component/card/cardTitle';
import { Chart } from 'component/chart/index';

export class FICard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { name, text, chart, rangeInfo } = this.props;
    let value = this.props.status[name];
    let { type, onChange } = this.props.input;

    let { xlabel, ylabel } = chart.text;
    let chartValue = chart.value == null ? value : chart.value;
    let chartRangeInfo = chart.rangeInfo ? chart.rangeInfo : rangeInfo;
    let xrange = ChartService.xrange(chartValue, chartRangeInfo);
    let yrange = ChartService.yrange(xrange, chartRangeInfo, chart.fn);
    let data = ChartService.toModel(xrange, yrange, chart.formatter, chartRangeInfo.legend);

    return (
      <Card>
        <CardTitle text={text.title} />
        <CardSupporting text={text.supporting} />
        <CardMedia>
          <Chart data={data} type={chart.type} xlabel={xlabel} ylabel={ylabel} />
        </CardMedia>
        <CardAction>
          {React.createElement(type, { name, onChange, placeholder: text.placeholder, value, rangeInfo })}
        </CardAction>
      </Card>
    );
  }

  static chartFn(name, state) {
    let stateCopy = $.extend({}, state);

    return (e) => {
      stateCopy[name] = e;
      return Calculator.calculate(stateCopy);
    };
  }
}
