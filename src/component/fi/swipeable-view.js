// @flow

import { changeTab } from 'action/navigation';
import Financial from 'component/page/financial';
import Future from 'component/page/future';
import House from 'component/page/house';
import Summary from 'component/page/summary';
import type { Dispatch } from 'model/redux';
import { type State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

type StateProps = {|
  tabIndex: number,
|};

type DispatchProps = {|
  onNavigation: number => void,
|};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  tabIndex: parseInt(state.navigation.tabIndex),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onNavigation: tabIndex => dispatch(changeTab(tabIndex)),
});

const style = {
  height: '100%',
};

const slideStyle = {
  height: '100%',
};

const SwipeableView = ({ tabIndex, onNavigation }: Props) => (
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
    <Summary />
  </SwipeableViews>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwipeableView);
