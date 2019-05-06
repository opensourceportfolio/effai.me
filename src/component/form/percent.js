// @flow

import React from 'react';
import { percent } from 'service/formatter';
import PlainNumber, {
  type Props as PlainNumberProps,
} from 'component/form/plainNumber';

export type Props = PlainNumberProps;

const Percent = (props: Props) => (
  <PlainNumber formatter={percent} {...props} />
);

export default Percent;
