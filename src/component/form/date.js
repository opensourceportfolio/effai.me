// @flow

import React from 'react';
import TextField from '@material-ui/core/TextField';

export type DateText = {
  placeholder: string,
};

export type Props = {|
  name: string,
  onChange: (string, string) => void,
  text: DateText,
  value: string,
  max: string,
|};

const DateComponent = (props: Props) => {
  const { onChange, text, name } = props;

  return (
    <TextField
      type="date"
      {...props}
      fullWidth={true}
      label={text.placeholder}
      onChange={e => onChange(name, e.target.value)}
      value={props.value}
    />
  );
};

export default DateComponent;
