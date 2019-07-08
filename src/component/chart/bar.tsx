// @flow

import Chart, {
   ChartText,
   Formatter,
   Plot,
} from 'component/chart';
import React from 'react';

export interface Props {
  plot: Plot;
  formatter: Formatter;
  text: ChartText;
}

const Bar = (props: Props) => <Chart type="bar" {...props} />;

export default Bar;
