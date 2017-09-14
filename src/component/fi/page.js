import React from 'react';
import Chart from 'component/fi/chart';

const Page = ({ chart, children }) => (
  <div className="card__content">
    <div className="card__action">{children}</div>
    <div className="card__media">
      <Chart {...chart} />
    </div>
  </div>
);

export default Page;
