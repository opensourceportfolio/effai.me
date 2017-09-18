import React from 'react';
import Paper from 'material-ui/Paper';
import Chart from 'component/fi/chart';
import 'css/page.css';

const Page = ({ chart, children }) => (
  <div className="page__content">
    <Paper className="page__input" zDepth={1}>
      {children}
    </Paper>
    <Paper className="page_media" zDepth={1}>
      <Chart {...chart} />
    </Paper>
  </div>
);

export default Page;
