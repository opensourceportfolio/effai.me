

import PlainNumber, {
  type Props as PlainNumberProps,
} from 'component/form/plainNumber';
import React from 'react';
import { percent } from 'service/formatter';

export type Props = PlainNumberProps;

const Percent = (props: Props) => (
  <PlainNumber formatter={percent} {...props} />
);

export default Percent;
