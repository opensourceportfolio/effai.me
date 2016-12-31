import React from 'lib/react';
import { connect } from 'lib/react-redux';
import SwipeableViews from 'lib/react-swipeable-views';
import { changeTab } from 'action/navigation';
import Information from 'component/page/information';
import Chart from 'component/page/chart';

const mapStateToProps = (state) => {
  return {
    tabIndex: state.navigation.tabIndex,
  };
};

const mapDispatchToProps = { onNavigation: changeTab };

const FiSwipeableView = ({ tabIndex, onNavigation }) =>
  <SwipeableViews
    onChangeIndex={(i) => onNavigation(i)}
    index={tabIndex}
    resistance={true}
    containerStyle={{height: '100%'}}
  >
    <Information />
    <Chart />
  </ SwipeableViews>;

const container = connect(mapStateToProps, mapDispatchToProps);

export default container(FiSwipeableView);
