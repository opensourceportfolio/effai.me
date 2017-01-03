import React from 'lib/react';
import R from 'lib/ramda';
import scrollIntoView from 'lib/scroll-into-view';

export default class PlainNumber extends React.Component {

  componentDidMount() {
    this.validate();
  }

  handleChange({ target }) {
    this.props.onChange(this.props.name, target.value);
  }

  componentDidUpdate() {
    this.validate();
  }

  isValid(rangeInfo, value) {
    const val = parseFloat(value);

    return val && !isNaN(val) && val <= rangeInfo.max && val >= rangeInfo.min;
  }

  validate() {
    const plainNumber = this.refs.plainNumber;
    const { rangeInfo, value } = this.props;
    const isValid = this.isValid(rangeInfo, value);

    plainNumber.classList.add('is-dirty');
    plainNumber.classList.toggle('is-invalid', !isValid);
  }

  scrollIntoViewOnFocus() {
    const plainNumber = this.refs.plainNumber;

    scrollIntoView(plainNumber, {
      time: 500,
      align: {
        top: 0.5,
        left: 1,
      },
    });
  }

  render() {
    const { name, text, rangeInfo, value = '', formatter, inputProps } = this.props;
    const additional = R.is(Function, text.additional) ? text.additional(value) : text.additional;
    const isValid = this.isValid(rangeInfo, value);

    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield__masked" ref="plainNumber">
        <input className="mdl-textfield__input"
          ref="input"
          onChange={this.handleChange.bind(this)}
          onFocus={this.scrollIntoViewOnFocus.bind(this)}
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
