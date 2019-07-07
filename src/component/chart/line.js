// @flow
import Chart, {
  type ChartText,
  type Formatter,
  type Plot,
} from 'component/chart';
import React from 'react';

export type Props = {|
  plot: Plot,
  formatter: Formatter,
  text: ChartText,
|};

const Line = (props: Props) => <Chart type="line" {...props} />;

export default Line;
