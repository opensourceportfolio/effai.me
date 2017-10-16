import React from 'react';
import Page from 'component/fi/page';
import Homeowner from 'component/page/card/homeowner';
import Renter from 'component/page/card/renter';

const House = () => {
  return (
    <Page>
      <Homeowner />
      <Renter />
    </Page>
  );
};

export default House;
