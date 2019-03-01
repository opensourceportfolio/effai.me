// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'model/redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { changeTab } from 'action/navigation';
import Home from 'material-ui/svg-icons/action/home';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import WatchLater from 'material-ui/svg-icons/action/watch-later';
import ViewAgenda from 'material-ui/svg-icons/action/view-agenda';
import { type State } from 'model/state';

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

const tabLabel = (text: string) => (
  <span className="mui-tab__label">{text}</span>
);

const FiTab = ({ tabIndex, onNavigation }: Props) => {
  return (
    <Tabs value={tabIndex} onChange={onNavigation}>
      <Tab label={tabLabel('Financial')} value={0} icon={<AttachMoney />} />
      <Tab label={tabLabel('House')} value={1} icon={<Home />} />
      <Tab label={tabLabel('Future')} value={2} icon={<WatchLater />} />
      <Tab label={tabLabel('Summary')} value={3} icon={<ViewAgenda />} />
    </Tabs>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FiTab);
