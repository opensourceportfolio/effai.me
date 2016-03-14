import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { currency } from 'service/formatter';
import {chartFn} from 'service/chart';
import Card from 'component/fi/card';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

const HousePrice = (props) => {
  let text = i18n.housePrice;

  return (
    <Card
      chart={{
        type: BarChart,
        fn: chartFn('housePrice', status),
        formatter: { y: currency },
        text: i18n.housePrice.chart,
      }}
      input={{ type: Currency, onChange: props.onChange }}
      rangeInfo={meta.housePrice}
      name="housePrice"
      text={{
        title: text.title,
        supporting: text.supporting,
        placeholder: text.placeholder,
      }}
      status={status} />
  );
};

export default HousePrice;
