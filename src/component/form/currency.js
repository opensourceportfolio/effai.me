import React from 'lib/react';
import { formattedCurrency } from 'service/formatter';
import PlainNumber from 'component/form/plainNumber';

const Currency = (props) => {

  return (
    <PlainNumber formatter={formattedCurrency} {...props} />
  );
};

export default Currency;
