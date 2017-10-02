import React from 'react';
import { isNil } from 'ramda';
import Paper from 'material-ui/Paper';
import Chart from 'component/fi/chart';
import 'css/page.css';

const Page = ({ chart, children }) => (
  <div className="page__content">
    <Paper className="page__input" zDepth={1}>
      {children}
    </Paper>
    {isNil(chart) ? null : (
      <Paper className="page__media" zDepth={1}>
        <Chart {...chart} />
      </Paper>
    )}
  </div>
);

export default Page;
