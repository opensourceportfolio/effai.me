import React from 'react';
import { connect } from 'react-redux';
import FiHeader from 'component/fi/header';
import FiTab from 'component/fi/tab';
import FiSwipeableViews from 'component/fi/swipeable-view';

const App = () => (
  <div>
    <FiHeader />
    <FiTab />
    <FiSwipeableViews />
  </div>
);

export default connect()(App);
