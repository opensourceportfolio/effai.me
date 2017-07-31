import React from 'react';
import Base from 'component/chart/base';

const Line = ({ data, options }) =>
  <Base type="line" data={data} options={options} />;

export default Line;
