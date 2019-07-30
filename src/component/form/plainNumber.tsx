import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import { RangeInfo } from 'model/rangeInfo';
import * as React from 'react';

interface PlainNumberTextSettings {
  additional?: ((s: string) => string | undefined) | string;
  placeholder: string | undefined;
  error: string | undefined;
}

export interface Props {
  classes?: string[];
  formatter?: (v: number) => string;
  onChange: (name: string, value: string) => void;
  name: string;
  rangeInfo: RangeInfo;
  text: PlainNumberTextSettings;
  value: number;
}

export default class PlainNumber extends React.Component<Props> {
  private plainNumber: React.RefObject<HTMLDivElement>;

  private plainNumberInput: React.RefObject<HTMLDivElement>;

  public constructor(props: Props) {
    super(props);
    this.plainNumber = React.createRef();
    this.plainNumberInput = React.createRef();
  }

  private isValid(rangeInfo: RangeInfo, value: string) {
    const val = parseFloat(value);

    return val != null && val <= rangeInfo.max && val >= rangeInfo.min;
  }

  private toggleMask(isFocus: boolean) {
    if (this.plainNumber.current && this.plainNumberInput.current) {
      isFocus && this.plainNumberInput.current.focus();

      this.plainNumber.current.classList.toggle(
        'mui-text-field__masked-text--focus',
        isFocus,
      );
    }
  }

  public render() {
    const { classes, name, text, rangeInfo, value = 0, formatter } = this.props;
    const { onChange } = this.props;
    const additional =
      typeof text.additional === 'function'
        ? text.additional(value.toString())
        : text.additional;
    const isValid = this.isValid(rangeInfo, value.toString());

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
          {isValid && formatter
            ? formatter(parseFloat(value.toString()))
            : value}
        </div>
      </div>
    );
  }
}
