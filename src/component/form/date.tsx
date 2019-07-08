// @flow

import TextField from '@material-ui/core/TextField';
import React from 'react';

export interface DateText {
  placeholder: string,
};

export interface Props {
  name: string,
  onChange: (string, string) => void,
  text: DateText,
  value: string,
  max: string,
};

const DateComponent = (props: Props) => {
  const { onChange, text, name } = props;

  return (
    <div className="mui-field">
      <TextField
        type="date"
        {...props}
        fullWidth={true}
        label={text.placeholder}
        onChange={e => onChange(name, e.target.value)}
        value={props.value}
      />
    </div>
  );
};

export default DateComponent;
