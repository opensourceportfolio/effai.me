// @flow

import React from 'react';
import { always, cond, lt, gte, either, T } from 'ramda';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
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
    <AppBar
      showMenuIconButton={false}
      title={fiAge(yrs)}
      iconElementRight={
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Share Results" onClick={onToggleShare} />
          <MenuItem primaryText="My Blog" onClick={navigateToBlog} />
        </IconMenu>
      }
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
