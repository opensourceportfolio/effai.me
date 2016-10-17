import React from 'lib/react';
import R from 'lib/ramda';
import componentHandler from 'lib/mdl';
import 'lib/mdl/dist/material.red-amber.min.css';
import { formattedNumber } from 'service/formatter';

export default class PlainNumber extends React.Component {

  componentDidMount() {
    const node = this.refs.plainNumber;

    componentHandler.upgradeElement(node);
  }

  handleChange({ target }) {
    if (target.validity.valid) {
      const value = parseInt(target.value);

      if (R.is(Number, value)) {
        this.props.onChange(this.props.name, value);
      }
    } else {
      this.props.onChange(this.props.name, null);
    }
  }

  render() {
    const { name, text, rangeInfo, value = '' } = this.props;
    const placeholder = R.is(Function, text.placeholder) ? text.placeholder(value) : text.placeholder;

    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield__masked" ref="plainNumber">
        <input className="mdl-textfield__input"
          defaultValue={value}
          onChange={this.handleChange.bind(this)}
          pattern="\d*"
          required
          min={rangeInfo.min}
          max={rangeInfo.max}
          type="number" />
        <label className="mdl-textfield__mask">
          {value == null ? '' : formattedNumber(value)}
        </label>
        <label className="mdl-textfield__label" htmlFor={name}>
          {value == null ? text.error : placeholder}
        </label>
      </div>
    );
  }
}
