import React from 'lib/react';
import { PeriodSelection } from 'component/form/periodSelection';

export class Period extends React.Component {
  constructor(props) {
    super(props);
  }

  handleValueChange(event) {
    var value = parseInt(event.target.value);
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
        <div className="input-field col s6">
          <i className="mdi-editor-attach-money prefix"></i>
          <input className="validate" defaultValue={this.props.value} onChange={handleValueChange} required type="number" />
          <label className="active">{this.props.placeholder}</label>
        </div>
        <div className="input-field col s6">
          <PeriodSelection current={this.props.rate} onChange={handleRateChange} />
        </div>
      </div>
    );
  }
}
