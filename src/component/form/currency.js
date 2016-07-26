import React from 'lib/react';
import R from 'lib/ramda';
import componentHandler from 'lib/mdl';
import { formattedNumber } from 'service/formatter';

export default class Currency extends React.Component {

  componentDidMount() {
    const node = this.refs.currency;

    componentHandler.upgradeElement(node);
  }

  handleChange(event) {
    if (event.target.validity.valid) {
      let value = parseInt(event.target.value);

      value = R.is(Number, value) ? value : '';
      this.props.onChange(this.props.name, value);
    } else {
      this.props.onChange(this.props.name, null);
    }
  }

  render() {
    let value = this.props.value;

    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield__masked" ref="currency">
        <span className="mdl-textfield-icon">$</span>
        <input className="mdl-textfield__input"
          defaultValue={value}
          onChange={this.handleChange.bind(this)}
          pattern="\d*"
          required
          min={this.props.rangeInfo.min}
          max={this.props.rangeInfo.max}
          type="number" />
        <label className="mdl-textfield__mask">
          {value == null ? '' : formattedNumber(value)}
        </label>
        <label className="mdl-textfield__label" htmlFor={this.props.name}>
          {value == null ? this.props.text.error : this.props.text.placeholder}
        </label>
      </div>
    );
  }
}
