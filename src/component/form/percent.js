// @flow

import React from 'react';
import { percent } from 'service/formatter';
import PlainNumber, { type Props } from 'component/form/plainNumber';

const Percent = (props: Props) => (
  <PlainNumber formatter={percent} {...props} />
);

export default Percent;
