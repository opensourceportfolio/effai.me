// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'model/redux';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { changeTab } from 'action/navigation';
import Home from '@material-ui/icons/Home';
import AttachMoney from '@material-ui/icons/AttachMoney';
import WatchLater from '@material-ui/icons/WatchLater';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import { type State } from 'model/state';

type StateProps = {|
  tabIndex: number,
|};

type DispatchProps = {|
  onNavigation: (mixed, number) => void,
|};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  tabIndex: parseInt(state.navigation.tabIndex),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onNavigation: (e, tabIndex) => dispatch(changeTab(tabIndex)),
});

const tabLabel = (text: string) => (
  <span className="mui-tab__label">{text}</span>
);

const FiTab = ({ tabIndex, onNavigation }: Props) => {
  return (
    <AppBar position="static">
      <Tabs value={tabIndex} onChange={onNavigation} variant="fullWidth">
        <Tab label={tabLabel('Financial')} value={0} icon={<AttachMoney />} />
        <Tab label={tabLabel('House')} value={1} icon={<Home />} />
        <Tab label={tabLabel('Future')} value={2} icon={<WatchLater />} />
        <Tab label={tabLabel('Summary')} value={3} icon={<ViewAgenda />} />
      </Tabs>
    </AppBar>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FiTab);
