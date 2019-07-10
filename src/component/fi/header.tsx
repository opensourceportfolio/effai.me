import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { toggleShare } from 'action/navigation';
import { FormInputs, State } from 'model/state';
import { always, cond, either, gte, lt, T } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { years } from 'service/calculator';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

interface StateProps {
  input: FormInputs;
}

interface DispatchProps {
  onToggleShare: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  input: state.input,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onToggleShare: () => dispatch(toggleShare()),
});

const fiAge: (v: number) => string = cond([
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
        <Typography variant="h4" color="inherit">
          {fiAge(yrs)}
        </Typography>
        <Menu open={false}>
          <MenuItem onClick={onToggleShare}>Share Results</MenuItem>
          <MenuItem onClick={navigateToBlog}>My Blog</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
