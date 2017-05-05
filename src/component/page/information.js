import React from 'react';
import Future from 'component/fi/card/future';
import Financial from 'component/fi/card/financial';
import House from 'component/fi/card/house';

const Information = () => (
  <div className="page__information">
    <Financial />
    <House />
    <Future />
  </div>
);

export default Information;
