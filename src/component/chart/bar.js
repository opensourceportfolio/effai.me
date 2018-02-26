// @flow

import React from 'react';
import Base, { type Props as BaseProps } from 'component/chart/base';

const Bar = ({ data, options }: BaseProps) => (
  <Base type="bar" data={data} options={options} />
);

export default Bar;
