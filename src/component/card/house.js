import React from 'react';
import { connect } from 'react-redux';
import { changeValue } from 'action/fi';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { xrange, yrange } from 'service/chart';
import {
  compound,
  percentage,
  toFraction,
  debt,
  equity,
  years,
  monthsToNow,
} from 'service/calculator';
import { longCurrency, formattedNumber } from 'service/formatter';
import { pmt } from 'service/amortization';
import { Row, Column } from 'component/grid';
import ChartCard from 'component/fi/chart-card';
import LineChart from 'component/chart/line';
import Currency from 'component/form/currency';
import Percent from 'component/form/percent';
import Date from 'component/form/date';
import PlainNumber from 'component/form/plainNumber';

const mapStateToProps = state => ({
  state: state.input,
});

const mapDispatchToProps = {
  onChange: changeValue,
};

const House = ({ onChange, state }) => {
  const text = i18n.house;
  const downpaymentAmount = percentage(state.price, state.downpayment);
  const yrs = years(state) + monthsToNow(state.purchaseDate) / 12;

  const debtFn = year => {
    return debt(state, year);
  };

  const equityFn = year => {
    return equity(state, year);
  };

  const valueFn = year => {
    return compound(state.price, state.houseGrowth, year);
  };

  const min = 0;
  const max = state.term;
  const step = (max - min) / 5;
  const rangeInfo = { min, max, step };
  const fn = [debtFn, equityFn, valueFn];
  const x = xrange(0, rangeInfo);
  const y = yrange(x, rangeInfo, fn);
  const chart = {
    type: LineChart,
    plot: { x, y },
    formatter: { y: longCurrency },
    text: text.chart,
    options: { low: 0 },
  };

  const price = {
    name: 'price',
    onChange,
    text: {
      placeholder: text.price.placeholder,
      error: i18n.error.between(meta.house.price.min, meta.house.price.max),
    },
    value: state.price,
    rangeInfo: meta.house.price,
  };

  const downpayment = {
    name: 'downpayment',
    onChange,
    text: {
      placeholder: text.downpayment.placeholder,
      additional: text.downpayment.additional(downpaymentAmount),
      error: i18n.error.between(meta.house.downpayment.min, meta.house.downpayment.max),
    },
    value: state.downpayment,
    rangeInfo: meta.house.downpayment,
  };

  const payment = pmt(
    toFraction(state.rate / 12),
    state.term * 12,
    -state.price + downpaymentAmount,
    0,
  );
  const rate = {
    name: 'rate',
    onChange,
    text: {
      placeholder: text.rate.placeholder,
      additional: text.rate.additional(payment),
      error: i18n.error.between(meta.house.rate.min, meta.house.rate.max),
    },
    value: state.rate,
    rangeInfo: meta.house.rate,
  };

  const term = {
    name: 'term',
    onChange,
    text: {
      placeholder: text.term.placeholder,
      error: i18n.error.between(meta.house.term.min, meta.house.term.max),
    },
    value: state.term,
    rangeInfo: meta.house.term,
    formatter: formattedNumber,
  };

  const futurePrice = compound(state.price, state.houseGrowth, yrs);
  const houseGrowth = {
    name: 'houseGrowth',
    onChange,
    text: {
      placeholder: text.houseGrowth.placeholder,
      additional: text.houseGrowth.additional(futurePrice),
      error: i18n.error.between(meta.house.houseGrowth.min, meta.house.houseGrowth.max),
    },
    value: state.houseGrowth,
    rangeInfo: meta.house.houseGrowth,
  };

  const purchaseDate = {
    name: 'purchaseDate',
    onChange,
    text: {
      placeholder: text.purchaseDate.placeholder,
    },
    value: state.purchaseDate,
    rangeInfo: meta.house.purchaseDate,
  };

  return (
    <ChartCard title={text.title} supporting={text.supporting} chart={chart}>
      <Row>
        <Column>
          <Currency {...price} />
        </Column>
        <Column>
          <Percent {...downpayment} />
        </Column>
      </Row>
      <Row>
        <Column>
          <Percent {...rate} />
        </Column>
        <Column>
          <PlainNumber {...term} />
        </Column>
      </Row>
      <Percent {...houseGrowth} />
      <Date {...purchaseDate} />
    </ChartCard>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(House);
