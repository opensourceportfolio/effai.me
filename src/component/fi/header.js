import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import { years } from 'service/calculator';
import { meta } from 'service/meta';
import { i18n } from 'service/i18n';

const mapStateToProps = state => state;

const fiAge = yrs => {
  if (isNaN(yrs) || yrs > meta.range) {
    return i18n.fiStatus.never;
  } else if (yrs <= 0) {
    return i18n.fiStatus.done;
  } else {
    return i18n.fiStatus.formatter(yrs);
  }
};

const Header = ({ input }) => {
  const yrs = years(input);

  return (
    <AppBar
      showMenuIconButton={false}
      title={fiAge(yrs)}
      iconElementRight={
        <IconButton>
          <AccountBox />
        </IconButton>
      }
    />
  );
};

export default connect(mapStateToProps)(Header);
