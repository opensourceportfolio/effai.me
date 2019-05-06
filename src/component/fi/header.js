// @flow

import React from 'react';
import { always, cond, lt, gte, either, T } from 'ramda';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { years } from 'service/calculator';
import { meta } from 'service/meta';
import { i18n } from 'service/i18n';
import type { State, FormInputs } from 'model/state';
import { toggleShare } from 'action/navigation';
import type { Dispatch } from 'model/redux';

type StateProps = {
  input: FormInputs,
};

type DispatchProps = {
  onToggleShare: () => void,
};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  input: state.input,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onToggleShare: () => dispatch(toggleShare()),
});

const fiAge: number => string = cond([
  [either(lt(meta.range), isNaN), always(i18n.fiStatus.never)],
  [gte(0), always(i18n.fiStatus.done)],
  [T, i18n.fiStatus.formatter],
]);

const navigateToBlog = () => {
  window.location.href = 'https://www.medium.com/effai-me';
};

const Header = ({ input, onToggleShare }: Props) => {
  const yrs = years(input);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          {fiAge(yrs)}
        </Typography>
        <Menu open={false}>
          <MenuItem primaryText="Share Results" onClick={onToggleShare} />
          <MenuItem primaryText="My Blog" onClick={navigateToBlog} />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
