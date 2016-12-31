import React from 'lib/react';
import Future from 'component/fi/card/future';
import Financial from 'component/fi/card/financial';
import House from 'component/fi/card/house';

const Information = () =>
  <div id="information" style={{'paddingBottom': '150px'}}>
    <Financial />
    <House />
    <Future />
  </div>;

export default Information;
