import React from 'lib/react';
import { connect } from 'lib/react-redux';
import AppBar from 'material-ui/AppBar';
import { years } from 'service/calculator';
import { meta } from 'service/meta';
import { i18n } from 'service/i18n';
import { changeTab } from 'action/navigation';

const mapStateToProps = (state) => state;

const mapDispatchToProps = {
  onNavigation: changeTab
};

const style = {
  position: 'fixed',
  top: 0,
};

const fiAge = (yrs) => {
  if (isNaN(yrs) || yrs > meta.range) {
    return i18n.fiStatus.never;
  } else if (yrs <= 0) {
    return i18n.fiStatus.done;
  } else {
    return i18n.fiStatus.formatter(yrs);
  }
};

const Header = ({input}) => {
  const yrs = years(input);

  return (
    <AppBar showMenuIconButton={false} title={fiAge(yrs)} style={style} />
  );
};

const container = connect(mapStateToProps, mapDispatchToProps);

export default container(Header);
