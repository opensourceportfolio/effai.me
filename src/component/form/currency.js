// @flow
import React from 'react';
import { formattedCurrency } from 'service/formatter';
import PlainNumber, {
  type Props as PlainNumberProps,
} from 'component/form/plainNumber';

export type Props = PlainNumberProps;

const Currency = (props: Props) => (
  <PlainNumber formatter={formattedCurrency} {...props} />
);

export default Currency;
