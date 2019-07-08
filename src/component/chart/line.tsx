import Chart, { ChartText, Formatter, Plot } from 'component/chart';
import React from 'react';

export interface Props {
  plot: Plot;
  formatter: Formatter;
  text: ChartText;
}

const Line = (props: Props) => <Chart type="line" {...props} />;

export default Line;
