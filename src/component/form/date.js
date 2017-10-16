import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const Date = props => {
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
