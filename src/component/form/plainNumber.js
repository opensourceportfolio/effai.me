// @flow

import React from 'react';
import scrollIntoView from 'scroll-into-view';
import TextField from 'material-ui/TextField';
import { cyanA700 } from 'material-ui/styles/colors';
import { type RangeInfo } from 'model/rangeInfo';

type PlainNumberTextSettings = {
  additional?: (mixed => string) | string,
  placeholder?: string,
  error?: string,
};

export type Props = {
  name: string,
  text: PlainNumberTextSettings,
  rangeInfo: RangeInfo,
  value: string,
  formatter?: number => string,
  onChange: (string, string) => void,
};

export default class PlainNumber extends React.Component<Props> {
  plainNumber: ?HTMLDivElement;

  isValid(rangeInfo: RangeInfo, value: string) {
    const val = parseFloat(value);

    return val != null && val <= rangeInfo.max && val >= rangeInfo.min;
  }

  scrollIntoViewOnFocus() {
    const plainNumber = this.plainNumber;

    scrollIntoView(plainNumber, {
      time: 500,
      align: {
        top: 0.5,
        left: 1,
      },
    });
  }

  toggleMask(isFocus: boolean) {
    this.plainNumber &&
      this.plainNumber.classList.toggle(
        'mui-text-field__masked-text--focus',
        isFocus,
      );
  }

  render() {
    const { name, text, rangeInfo, value = '', formatter } = this.props;
    const { onChange } = this.props;
    const additional =
      typeof text.additional === 'function'
        ? text.additional(value)
        : text.additional;
    const isValid = this.isValid(rangeInfo, value);

    return (
      <div
        className="mui-text-field__masked-text"
        ref={e => (this.plainNumber = e)}
      >
        <TextField
          className="mui-text-field__input-text"
          name={name}
          type="number"
          value={value}
          fullWidth={true}
          floatingLabelText={text.placeholder}
          errorText={isValid ? null : text.error}
          onChange={({ target }) => onChange(name, target.value)}
          onFocus={() => this.toggleMask(true)}
          onBlur={() => this.toggleMask(false)}
        />
        {isValid ? (
          <label
            htmlFor={name}
            className="mui-text-field__additional-text"
            style={{ color: cyanA700 }}
          >
            {additional}
          </label>
        ) : null}
        <div className="mui-text-field__mask-text">
          {isValid && formatter ? formatter(parseFloat(value)) : value}
        </div>
      </div>
    );
  }
}
