import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { changeTab } from 'action/navigation';

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
      <Tab label="Knowns" value={0} />
      <Tab label="Chart" value={1} />
    </Tabs>
  );
};

const container = connect(mapStateToProps, mapDispatchToProps);

export default container(FiTab);
