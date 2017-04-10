import React from 'lib/react';
import scrollIntoView from 'lib/scroll-into-view';
import TextField from 'material-ui/TextField';

export default class PlainNumber extends React.Component {
  isValid(rangeInfo, value) {
    const val = parseFloat(value);

    return val && !isNaN(val) && val <= rangeInfo.max && val >= rangeInfo.min;
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

  toggleMask(isFocus) {
    this.refs.input.classList.toggle(
      'mui-text-field__masked-text--focus',
      isFocus,
    );
  }

  render() {
    const { name, text, rangeInfo, value = '', formatter } = this.props;
    const { onChange } = this.props;
    const additional = typeof text.additional === 'function'
      ? text.additional(value)
      : text.additional;
    const isValid = this.isValid(rangeInfo, value);

    return (
      <div className="mui-text-field__masked-text" ref="input">
        <TextField
          className="mui-text-field__input-text"
          name={name}
          type="tel"
          value={value}
          fullWidth={true}
          floatingLabelText={text.placeholder}
          errorText={isValid ? null : text.error}
          onChange={({ target }) => onChange(name, target.value)}
          onFocus={() => this.toggleMask(true)}
          onBlur={() => this.toggleMask(false)}
        />
        {isValid
          ? <label className="mui-text-field__additional-text">
              {additional}
            </label>
          : null}
        <div className="mui-text-field__mask-text">
          {isValid ? formatter(value) : value}
        </div>
      </div>
    );
  }
}
