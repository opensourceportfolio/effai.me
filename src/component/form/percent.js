import React from 'lib/react';
import { percent } from 'service/formatter';
import PlainNumber from 'component/form/plainNumber';

const Percent = (props) => {

  return (
    <PlainNumber formatter={percent} {...props} />
  );
};

export default Percent;
