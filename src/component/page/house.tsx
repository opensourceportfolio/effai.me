import Page from 'component/fi/page';
import Homeowner from 'component/page/card/homeowner';
import Renter from 'component/page/card/renter';
import React from 'react';

const House = () => (
  <Page>
    <Homeowner />
    <Renter />
  </Page>
);

export default House;
