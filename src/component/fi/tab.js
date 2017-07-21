import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { changeTab } from 'action/navigation';
import Home from 'material-ui/svg-icons/action/home';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import WatchLater from 'material-ui/svg-icons/action/watch-later';

const mapStateToProps = state => ({
  tabIndex: parseInt(state.navigation.tabIndex),
});

const mapDispatchToProps = { onNavigation: changeTab };

const style = {
  position: 'fixed',
  top: '64px',
  width: '100%',
  zIndex: '1',
};

const FiTab = ({ tabIndex, onNavigation }) => {
  return (
    <Tabs value={tabIndex} onChange={i => onNavigation(i)} style={style}>
      <Tab label="Financial" value={0} icon={<AttachMoney />}  />
      <Tab label="House" value={1} icon={<Home />} />
      <Tab label="Future" value={2} icon={<WatchLater />} />
    </Tabs>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FiTab);
