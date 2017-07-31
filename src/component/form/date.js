import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const Date = props => {
  const { name, value, onChange, text, rangeInfo } = props;

  return (
    <DatePicker
      name={name}
      value={value}
      onChange={(e, newDate) => onChange(name, newDate)}
      fullWidth={true}
      max={rangeInfo.max}
      floatingLabelText={text.placeholder}
    />
  );
};

export default Date;
