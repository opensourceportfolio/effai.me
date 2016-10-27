import React from 'lib/react';
import R from 'lib/ramda';
import componentHandler from 'lib/mdl';

export default class PlainNumber extends React.Component {

  componentDidMount() {
    const node = this.refs.plainNumber;

    componentHandler.upgradeElement(node);
  }

  handleChange({ target }) {
    if (target.validity.valid) {
      this.props.onChange(this.props.name, target.value);
    } else {
      this.props.onChange(this.props.name, null);
    }
  }

  validate(rangeInfo, value) {
    const val = parseFloat(value);

    return val && val <= rangeInfo.max && val >= rangeInfo.min;
  }

  render() {
    const { name, text, rangeInfo, value = '', formatter, inputProps } = this.props;
    const additional = R.is(Function, text.additional) ? text.additional(value) : text.additional;
    const isValid = this.validate(rangeInfo, value);

    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield__masked" ref="plainNumber">
        <input className="mdl-textfield__input"
          onChange={this.handleChange.bind(this)}
          required
          type="tel"
          value={value || ''}
          step="1"
          {...inputProps}
        />
        <label className="mdl-textfield__mask">
          {isValid ? formatter(value) : ''}
        </label>
        <label className="mdl-textfield__label" htmlFor={name}>
          {text.placeholder}
        </label>
        <label className="mdl-textfield__additional" htmlFor={name}>
          {isValid ? additional : text.error}
        </label>
      </div>
    );
  }
}
