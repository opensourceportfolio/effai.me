// @flow

import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { type RangeInfo } from 'model/rangeInfo';
import * as React from 'react';
import scrollIntoView from 'scroll-into-view';

type PlainNumberTextSettings = {
  additional?: (mixed => string) | string,
  placeholder?: string,
  error?: string,
};

export type Props = {|
  classes?: string[],
  formatter?: number => string,
  onChange: (string, string) => void,
  name: string,
  rangeInfo: RangeInfo,
  text: PlainNumberTextSettings,
  value: string,
|};

export default class PlainNumber extends React.Component<Props> {
  plainNumber: {| current: ?HTMLDivElement |};

  plainNumberInput: {| current: ?HTMLInputElement |};

  constructor(props: Props) {
    super(props);
    this.plainNumber = React.createRef();
    this.plainNumberInput = React.createRef();
  }

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
    if (this.plainNumber.current && this.plainNumberInput.current) {
      isFocus && this.plainNumberInput.current.focus();

      this.plainNumber.current.classList.toggle(
        'mui-text-field__masked-text--focus',
        isFocus,
      );
    }
  }

  render() {
    const {
      classes,
      name,
      text,
      rangeInfo,
      value = '',
      formatter,
    } = this.props;
    const { onChange } = this.props;
    const additional =
      typeof text.additional === 'function'
        ? text.additional(value)
        : text.additional;
    const isValid = this.isValid(rangeInfo, value);

    return (
      <div
        className={`mui-field mui-text-field__masked-text ${(
          classes || []
        ).join(' ')}`}
        ref={this.plainNumber}
      >
        <TextField
          inputRef={this.plainNumberInput}
          className="mui-text-field__input-text"
          name={name}
          type="number"
          value={value}
          fullWidth={true}
          label={text.placeholder}
          onChange={({ target }) => onChange(name, target.value)}
          onFocus={() => this.toggleMask(true)}
          onBlur={() => this.toggleMask(false)}
        />
        {isValid && additional && <FormHelperText>{additional}</FormHelperText>}
        <div
          className="mui-text-field__mask-text"
          onClick={() => this.toggleMask(true)}
        >
          {isValid && formatter ? formatter(parseFloat(value)) : value}
        </div>
      </div>
    );
  }
}
