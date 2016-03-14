import React from 'lib/react';
import { xrange, yrange, toModel } from 'service/chart';
import Card from 'component/mdl/card';
import Action from 'component/mdl/card/action';
import Media from 'component/mdl/card/media';
import Supporting from 'component/mdl/card/supporting';
import Title from 'component/mdl/card/title';

const Card = (props) => {
  let chartOptions = {};
  let { name, text, chart, rangeInfo } = props;
  let value = props.status[name];
  let { type, onChange } = props.input;

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
      <Title text={text.title} />
      <Supporting text={text.supporting} />
      <Media>
        {React.createElement(chart.type, { data, xlabel, ylabel, options: chartOptions })}
      </Media>
      <Action>
        {React.createElement(type, { name, onChange, text, value, rangeInfo })}
      </Action>
    </Card>
  );
};

export default Card;
