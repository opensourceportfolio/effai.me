import React from 'react';
import Base, { type Props as BaseProps } from 'component/chart/base';

const Line = ({ data, options }: BaseProps) => (
  <Base type="line" data={data} options={options} />
);

export default Line;
