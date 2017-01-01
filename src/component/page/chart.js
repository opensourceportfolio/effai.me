import React from 'lib/react';
import { connect } from 'lib/react-redux';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { xrange, yrange } from 'service/chart';
import { years, compound, totalYield } from 'service/calculator';
import { longCurrency } from 'service/formatter';
import ChartComponent from 'component/fi/chart';
import LineChart from 'component/chart/line';

const mapStateToProps = (state) => {
  return {
    status: state.input
  };
};

const Chart = ({status}) => {
  const yrs = years(status);
  const min = 0;
  const max = Math.min(yrs + 7, meta.range);
  const step = Math.min((yrs + 7) / 7, 7);
  const rangeInfo = { min, max, step };

  const compoundFn = (year) => {
    return compound(status.renter, status.inflation, parseFloat(year));
  };

  const fn = [compoundFn, (v) => totalYield(status, parseFloat(v))];
  const x = xrange(0, rangeInfo);
  const y = yrange(x, rangeInfo, fn);

  const chart = {
    type: LineChart,
    plot: {x, y},
    formatter: {  y: longCurrency },
    text: i18n.chart,
    chartOptions: {
      fill: false,
    }
  };

  return (
    <div id="chart" style={{display: 'flex', flexDirection: 'column', height: '80%'}}>
      <ChartComponent {...chart} />
    </div>
  );
};

export default connect(mapStateToProps)(Chart);
