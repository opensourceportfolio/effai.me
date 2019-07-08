// @flow
import PlainNumber, { Props as PlainNumberProps } from 'component/form/plainNumber';
import React from 'react';
import { formattedCurrency } from 'service/formatter';

export type Props = PlainNumberProps;

const Currency = (props: Props) => (
  <PlainNumber formatter={formattedCurrency} {...props} />
);

export default Currency;
