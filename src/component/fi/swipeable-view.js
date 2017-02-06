import React from 'lib/react';
import { connect } from 'lib/react-redux';
import SwipeableViews from 'lib/react-swipeable-views';
import { changeTab } from 'action/navigation';
import Information from 'component/page/information';
import Chart from 'component/page/chart';

const isEmpty = (o) => Object.keys(o).length == 0;

const mapStateToProps = (state) => {
  return {
    isLoaded: !isEmpty(state.input),
    tabIndex: parseInt(state.navigation.tabIndex),
  };
};

const mapDispatchToProps = { onNavigation: changeTab };

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '5px',
};

const SwipeableView = ({ isLoaded, tabIndex, onNavigation }) =>
  <SwipeableViews
    onChangeIndex={(i) => onNavigation(i)}
    index={tabIndex} resistance={true}
    style={style}>
      {
        isLoaded ? <Information /> : null
      }
      {
        isLoaded ? <Chart /> : null
      }
  </SwipeableViews>;

const container = connect(mapStateToProps, mapDispatchToProps);

export default container(SwipeableView);
