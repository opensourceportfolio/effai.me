import React from 'lib/react';
import { Card, CardHeader, CardMedia, CardActions } from 'material-ui/Card';
import Chart from 'component/fi/chart';

const ChartCard = ({ title, supporting, chart, children }) =>
  <Card>
    <CardHeader title={title} subtitle={supporting} />
    <CardMedia>
      <Chart {...chart} />
    </CardMedia>
    <CardActions>
      {children}
    </CardActions>
  </Card>;

export default ChartCard;
