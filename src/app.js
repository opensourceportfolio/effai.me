import React from 'lib/react';
import { connect } from 'lib/react-redux';
import FiHeader from 'component/fi/header';
import FiTab from 'component/fi/tab';
import FiSwipeableViews from 'component/fi/swipeable-view';

class App extends React.Component {

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header is-upgraded">
        <FiHeader />
        <FiTab />
        <FiSwipeableViews />
      </div>
    );
  }
}

export default connect()(App);
