import React from 'lib/react';
import { PeriodSelection } from 'component/form/periodSelection';
import { Currency } from 'component/form/currency';

export class Period extends React.Component {
  constructor(props) {
    super(props);
  }

  handleValueChange(name, value) {
    value = !value ? 0 : value;
    this.props.onChange(this.props.name, value);
  }

  handleRateChange(event) {
    var value = parseInt(event.target.value);
    this.props.onChange(this.props.name + 'Rate', value);
  }

  render() {
    var handleValueChange = this.handleValueChange.bind(this);
    var handleRateChange = this.handleRateChange.bind(this);
    return (
      <div>
        <Currency className="col s6" name={this.props.name} onChange={handleValueChange} placeholder={this.props.placeholder} value={this.props.value} />
        <div className="input-field col s6">
          <PeriodSelection current={this.props.rate} onChange={handleRateChange} />
        </div>
      </div>
    );
  }
}
