// @flow

import React from 'react';
import { always, cond, lt, gte, either, T } from 'ramda';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import { years } from 'service/calculator';
import { meta } from 'service/meta';
import { i18n } from 'service/i18n';

const mapStateToProps = state => state;

const fiAge: number => string = cond([
  [either(lt(meta.range), isNaN), always(i18n.fiStatus.never)],
  [gte(0), always(i18n.fiStatus.done)],
  [T, i18n.fiStatus.formatter],
]);

const navigateToBlog = () => {
  window.location.replace('https://www.medium.com/effai-me');
};

const Header = ({ input }) => {
  const yrs = years(input);

  return (
    <AppBar
      showMenuIconButton={false}
      title={fiAge(yrs)}
      iconElementRight={
        <IconButton onClick={navigateToBlog}>
          <AccountBox />
        </IconButton>
      }
    />
  );
};

export default connect(mapStateToProps)(Header);
