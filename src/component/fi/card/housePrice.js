import React from 'lib/react';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { currency } from 'service/formatter';
import FICard from 'component/fi/card/index';
import BarChart from 'component/chart/bar';
import Currency from 'component/form/currency';

export default class HousePrice extends React.Component  {

  render() {
    let text = i18n.housePrice;

    return (
      <FICard
        chart={{
          type: BarChart,
          fn: FICard.chartFn('housePrice', status),
          formatter: { y: currency },
          text: i18n.housePrice.chart,
        }}
        input={{ type: Currency, onChange: this.props.onChange }}
        rangeInfo={meta.housePrice}
        name="housePrice"
        text={{
          title: text.title,
          supporting: text.supporting,
          placeholder: text.placeholder,
        }}
        status={status} />
    );
  }
}
