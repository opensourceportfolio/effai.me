import React from 'lib/react';
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
    let { name, onChange, text, chart } = this.props;
    let { data, type} = chart;
    let { xlabel, ylabel } = text.chart;
    let value = this.props.status[name];
    let input = this.props.input;

    return (
      <Card>
        <CardTitle text={text.title} />
        <CardSupporting text={text.supporting} />
        <CardMedia>
          <Chart data={data} chartType={type} xlabel={xlabel} ylabel={ylabel} />
        </CardMedia>
        <CardAction>
          {React.createElement(input.type, {name, onChange, placeholder: text.placeholder, value, meta: input.meta})}
        </CardAction>
      </Card>
    );
  }
}
