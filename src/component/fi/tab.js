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

const tabLabel = text => <span className="mui-tab__label">{text}</span>;

const FiTab = ({ tabIndex, onNavigation }) => {
  return (
    <Tabs value={tabIndex} onChange={i => onNavigation(i)}>
      <Tab label={tabLabel('Financial')} value={0} icon={<AttachMoney />} />
      <Tab label={tabLabel('House')} value={1} icon={<Home />} />
      <Tab label={tabLabel('Future')} value={2} icon={<WatchLater />} />
    </Tabs>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FiTab);
