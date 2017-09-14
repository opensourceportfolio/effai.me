import React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { changeTab } from 'action/navigation';
import Future from 'component/card/future';
import Financial from 'component/card/financial';
import House from 'component/card/house';

const mapStateToProps = state => ({
  tabIndex: parseInt(state.navigation.tabIndex),
});

const mapDispatchToProps = { onNavigation: changeTab };

const style = {
  height: '100%',
};

const slideStyle = {
  height: '100%',
};

const SwipeableView = ({ tabIndex, onNavigation }) => (
  <SwipeableViews
    onChangeIndex={i => onNavigation(i)}
    index={tabIndex}
    resistance={true}
    style={style}
    slideStyle={slideStyle}
  >
    <Financial />
    <House />
    <Future />
  </SwipeableViews>
);

export default connect(mapStateToProps, mapDispatchToProps)(SwipeableView);
