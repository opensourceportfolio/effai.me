import React from 'lib/react';
import Card from 'component/mdl/card';
import Action from 'component/mdl/card/action';
import Media from 'component/mdl/card/media';
import Supporting from 'component/mdl/card/supporting';
import Title from 'component/mdl/card/title';
import Chart from 'component/fi/chart';

const ChartCard = ({ title, supporting, chart, children }) => {

  return (
    <Card>
      <Title text={title} />
      <Supporting text={supporting} />
      <Media>
        <Chart {...chart} />
      </Media>
      <Action>
        {children}
      </Action>
    </Card>
  );
};

export default ChartCard;
