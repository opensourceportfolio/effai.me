import React from 'lib/react';
import i18n from 'service/i18n';
import Range from 'service/range';
import { Card } from 'component/card/card';
import { CardAction } from 'component/card/cardAction';
import { CardMedia } from 'component/card/cardMedia';
import { CardSupporting } from 'component/card/cardSupporting';
import { CardTitle } from 'component/card/cardTitle';
import { Currency } from 'component/form/currency';
import { Percent } from 'component/form/percent';
import { Period } from 'component/form/period';
import { Chart } from 'component/chart';

export class FICard extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var range = new Range();
    var data = range[this.props.name](this.props.status);
    var name = this.props.name;
    var handleChange = this.props.onChange;
    var placeholder = i18n[name].placeholder;
    var rate = this.props.status[name + 'Rate'];
    var value = this.props.status[name];
    var inputType;
    var xlabel = i18n[name].chart.xAxisLabel;
    var ylabel = i18n[name].chart.yAxisLabel;

    switch (this.props.inputType) {
    case 'currency':
      inputType = <Currency name={name} onChange={handleChange} placeholder={placeholder} value={value} />;
      break;
    case 'percent':
      inputType = <Percent name={name} onChange={handleChange} placeholder={placeholder} value={value} />;
      break;
    case 'period':
      inputType = <Period name={name} onChange={handleChange} placeholder={placeholder} rate={rate} value={value} />;
      break;
    }
    return (
      <Card>
        <CardTitle text={i18n[name].title} />
        <CardSupporting text={i18n[name].text} />
        <CardMedia>
          <Chart data={data} name={name} type={this.props.chartType} xlabel={xlabel} ylabel={ylabel} />
        </CardMedia>
        <CardAction>
          {inputType}
        </CardAction>
      </Card>
    );
  }
}
