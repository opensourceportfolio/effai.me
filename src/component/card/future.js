import React from "react";
import { connect } from "react-redux";
import { changeValue } from "action/fi";
import { i18n } from "service/i18n";
import { meta } from "service/meta";
import {
  formattedCurrency,
  longCurrency,
  formattedShortFloat
} from "service/formatter";
import { years, compound } from "service/calculator";
import { xrange, yrange, chartFn } from "service/chart";
import { Row, Column } from "component/grid";
import ChartCard from "component/fi/chart-card";
import BarChart from "component/chart/bar";
import Currency from "component/form/currency";
import Percent from "component/form/percent";

const mapStateToProps = state => ({
  status: state.input
});

const mapDispatchToProps = {
  onChange: changeValue
};

const Future = ({ status, onChange }) => {
  const text = i18n.future;
  const yrs = years(status);

  const fn = chartFn("renter", status);
  const rangeInfo = meta.renter;
  const x = xrange(status.renter, rangeInfo);
  const y = yrange(x, rangeInfo, fn);
  const formatted2DecimalPoints = val => formattedShortFloat(2, val);
  const chart = {
    type: BarChart,
    plot: { x, y },
    formatter: { x: longCurrency, y: formatted2DecimalPoints },
    text: text.chart
  };

  const renterGoal = formattedCurrency(
    compound(status.renter, status.inflation, yrs)
  );
  const renter = {
    name: "renter",
    onChange,
    text: {
      placeholder: text.renter.placeholder,
      additional: text.renter.additional(renterGoal),
      error: i18n.error.between(meta.renter.min, meta.renter.max)
    },
    value: status.renter,
    rangeInfo: meta.renter
  };

  const homeownerGoal = formattedCurrency(
    compound(status.homeowner, status.inflation, yrs)
  );
  const homeowner = {
    name: "homeowner",
    onChange,
    text: {
      placeholder: text.homeowner.placeholder,
      additional: text.homeowner.additional(homeownerGoal),
      error: i18n.error.between(meta.homeowner.min, meta.homeowner.max)
    },
    value: status.homeowner,
    rangeInfo: meta.homeowner
  };

  const inflation = {
    name: "inflation",
    onChange,
    text: {
      placeholder: text.inflation.placeholder,
      error: i18n.error.between(meta.inflation.min, meta.inflation.max)
    },
    value: status.inflation,
    rangeInfo: meta.inflation
  };

  const withdrawl = {
    name: "withdrawl",
    onChange,
    text: {
      placeholder: text.withdrawl.placeholder,
      error: i18n.error.between(meta.withdrawl.min, meta.withdrawl.max)
    },
    value: status.withdrawl,
    rangeInfo: meta.withdrawl
  };

  return (
    <ChartCard title={text.title} supporting={text.supporting} chart={chart}>
      <Row>
        <Column>
          <Currency {...renter} />
        </Column>
        <Column>
          <Currency {...homeowner} />
        </Column>
      </Row>
      <Percent {...inflation} />
      <Percent {...withdrawl} />
    </ChartCard>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Future);
