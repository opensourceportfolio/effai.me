import React from 'lib/react';
import { Card, CardHeader, CardMedia, CardActions } from 'lib/material-ui/Card';
import Chart from 'component/fi/chart';

const ChartCard = ({ title, supporting, chart, children }) => (
  <Card containerStyle={{ margin: '20px 0' }}>
    <CardHeader title={title} subtitle={supporting} />
    <CardMedia style={{ padding: '5px' }}>
      <Chart {...chart} />
    </CardMedia>
    <CardActions>
      {children}
    </CardActions>
  </Card>
);

export default ChartCard;
