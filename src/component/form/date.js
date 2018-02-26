// @flow

import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export type DateText = {
  placeholder: string,
};

export type Props = {
  name: string,
  onChange: (string, string) => void,
  text: DateText,
  value: Date,
  openToYearSelection: boolean,
  autoOk: boolean,
  maxDate: Date,
};

const Date = (props: Props) => {
  const { onChange, text } = props;

  return (
    <DatePicker
      {...props}
      floatingLabelText={text.placeholder}
      fullWidth={true}
      onChange={(e, newDate) => onChange(props.name, newDate)}
    />
  );
};

export default Date;
