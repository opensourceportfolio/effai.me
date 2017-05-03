import React from 'lib/react';
import { connect } from 'lib/react-redux';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';
import { xrange, yrange } from 'service/chart';
import { years, compound, totalYield } from 'service/calculator';
import { longCurrency } from 'service/formatter';
import FiChart from 'component/fi/chart';
import LineChart from 'component/chart/line';

const mapStateToProps = state => ({
  status: state.input,
});

const Chart = ({ status }) => {
  const yrs = years(status);
  const min = 0;
  const max = Math.min(yrs + 7, meta.range);
  const step = Math.min((yrs + 7) / 7, 7);
  const rangeInfo = { min, max, step };

  const compoundFn = year => {
    return compound(status.renter, status.inflation, parseFloat(year));
  };

  const fn = [compoundFn, v => totalYield(status, parseFloat(v))];
  const x = xrange(0, rangeInfo);
  const y = yrange(x, rangeInfo, fn);

  const chart = {
    type: LineChart,
    plot: { x, y },
    formatter: { y: longCurrency },
    text: i18n.chart,
    chartOptions: {
      width: '500px',
      height: '1000px',
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
      }}>
      <div style={{ maxWidth: '100%', flex: '1' }}>
        <FiChart {...chart} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Chart);
