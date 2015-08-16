import React from 'lib/react';
import i18n from 'service/i18n';
import Range from 'service/range';
import { Card } from 'component/card';
import { CardContent } from 'component/card/cardContent';
import { CardAction } from 'component/card/cardAction';
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


    switch (this.props.inputType) {
      case 'currency':
        inputType = <Currency className="col s12" name={name} onChange={handleChange} placeholder={placeholder} value={value} />;
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
        <CardContent text={i18n[name].text} title={i18n[name].title}>
          <Chart data={data} type={this.props.chartType} />
        </CardContent>
        <CardAction>
          {inputType}
        </CardAction>
      </Card>
    );

  }
}
