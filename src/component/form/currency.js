// @flow
import React from 'react';
import { formattedCurrency } from 'service/formatter';
import PlainNumber, { type Props } from 'component/form/plainNumber';

const Currency = (props: Props) => (
  <PlainNumber formatter={formattedCurrency} {...props} />
);

export default Currency;
