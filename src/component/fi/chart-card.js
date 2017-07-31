import React from "react";
import { Card, CardHeader, CardMedia, CardActions } from "material-ui/Card";
import Chart from "component/fi/chart";

const ChartCard = ({ title, supporting, chart, children }) =>
  <Card className="card" containerStyle={{ margin: "20px 0" }}>
    <CardHeader className="card__header" title={title} subtitle={supporting} />
    <div className="card__content">
      <CardMedia className="card__media" style={{ padding: "5px" }}>
        <Chart {...chart} />
      </CardMedia>
      <CardActions className="card__action">
        {children}
      </CardActions>
    </div>
  </Card>;

export default ChartCard;
