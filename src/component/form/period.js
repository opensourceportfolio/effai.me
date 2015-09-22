import React from 'lib/react';
import $ from 'lib/jquery';
import { PeriodSelection } from 'component/form/periodSelection';
import { Currency } from 'component/form/currency';

export class Period extends React.Component {
  constructor(props) {
    super(props);
  }

  handleValueChange(name, data) {
    let value = parseInt(data);

    value = $.isNumeric(value) ? value : '';
    this.props.onChange(this.props.name, value);
  }

  handleRateChange(event) {
    let value = parseInt(event.target.value);

    value = $.isNumeric(value) ? value : '';
    this.props.onChange(`${this.props.name} Rate`, value);
  }

  render() {
    let handleValueChange = this.handleValueChange.bind(this);
    let handleRateChange = this.handleRateChange.bind(this);

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--6-col-desktop mdl-cell--6-col-phone">
          <Currency
          name={this.props.name}
          onChange={handleValueChange}
          placeholder={this.props.placeholder}
          value={this.props.value} />
        </div>
        <div className="mdl-cell mdl-cell--6-col-desktop mdl-cell--6-col-phone">
          <PeriodSelection current={this.props.rate} onChange={handleRateChange} />
        </div>
      </div>
    );
  }
}
