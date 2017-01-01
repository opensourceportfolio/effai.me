import React from 'lib/react';
import { connect } from 'lib/react-redux';
import SwipeableViews from 'lib/react-swipeable-views';
import R from 'lib/ramda';
import { changeTab } from 'action/navigation';
import Information from 'component/page/information';
import Chart from 'component/page/chart';

const mapStateToProps = (state) => {
  return {
    isLoaded: !R.isEmpty(state.input),
    tabIndex: state.navigation.tabIndex,
  };
};

const mapDispatchToProps = { onNavigation: changeTab };

const FiSwipeableView = ({ isLoaded, tabIndex, onNavigation }) =>
  <main className="mdl-layout__content">

    <SwipeableViews
      onChangeIndex={(i) => onNavigation(i)}
      index={tabIndex} resistance={true}
      style={{'display': 'flex', 'flexDirection': 'column'}}>

        {
          isLoaded ? <Information /> : null
        }

        {
          isLoaded ? <Chart /> : null
        }

    </SwipeableViews>
  </main>;

const container = connect(mapStateToProps, mapDispatchToProps);

export default container(FiSwipeableView);
