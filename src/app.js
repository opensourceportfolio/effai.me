import React from 'react';
import { connect } from 'react-redux';
import FiHeader from 'component/fi/header';
import FiTab from 'component/fi/tab';
import FiSwipeableViews from 'component/fi/swipeable-view';
import { loadUserData } from 'action/fi';

const mapDispatchToProps = {
  onLoad: loadUserData,
};

class App extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div>
        <FiHeader />
        <FiTab />
        <FiSwipeableViews />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
