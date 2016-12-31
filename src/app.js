import React from 'lib/react';
import { connect } from 'lib/react-redux';
import componentHandler from 'lib/mdl';
import FiHeader from 'component/fi/fi-header';
import FiSwipeableViews from 'component/fi/fi-swipeable-view';

class App extends React.Component {

  componentDidMount() {
    componentHandler.upgradeAllRegistered();
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header is-upgraded">
        <FiHeader />
        <FiSwipeableViews />
      </div>
    );
  }
}

export default connect()(App);
