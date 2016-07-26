import React from 'lib/react';
import Card from 'component/mdl/card';
import Action from 'component/mdl/card/action';
import Media from 'component/mdl/card/media';
import Supporting from 'component/mdl/card/supporting';
import Title from 'component/mdl/card/title';
import Chart from 'component/fi/chart';

const ChartCard = (props) => {
  const { title, supporting } = props;

  return (
    <Card>
      <Title text={title} />
      <Supporting text={supporting} />
      <Media>
        <Chart {...props.chart} />
      </Media>
      <Action>
        {props.children}
      </Action>
    </Card>
  );
};

export default ChartCard;
