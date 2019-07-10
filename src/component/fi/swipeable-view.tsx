import { changeTab } from 'action/navigation';
import Financial from 'component/page/financial';
import Future from 'component/page/future';
import House from 'component/page/house';
import Summary from 'component/page/summary';
import { State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { Dispatch } from 'redux';

interface StateProps {
  tabIndex: number;
}

interface DispatchProps {
  onNavigation: (v: number) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  tabIndex: state.navigation.tabIndex,
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

const SwipeableView: React.FC<Props> = ({ tabIndex, onNavigation }: Props) => (
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
