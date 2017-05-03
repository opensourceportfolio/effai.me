import React from 'lib/react';
import { connect } from 'lib/react-redux';
import SwipeableViews from 'lib/react-swipeable-views';
import { changeTab } from 'action/navigation';
import Information from 'component/page/information';
import Chart from 'component/page/chart';

const mapStateToProps = state => ({
  tabIndex: parseInt(state.navigation.tabIndex),
});

const mapDispatchToProps = { onNavigation: changeTab };

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '5px',
};

const slideStyle = {
  padding: '5px',
};

const SwipeableView = ({ tabIndex, onNavigation }) => (
  <SwipeableViews
    onChangeIndex={i => onNavigation(i)}
    index={tabIndex}
    resistance={true}
    style={style}
    slideStyle={slideStyle}>
    <Information />
    <Chart />
  </SwipeableViews>
);

const container = connect(mapStateToProps, mapDispatchToProps);

export default container(SwipeableView);
