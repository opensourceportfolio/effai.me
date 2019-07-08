// @flow

import * as actions from 'action/navigation';
import { Action } from 'model/redux';
import { Navigation } from 'model/state';
import { originalState } from 'service/user-setting';

export function navigation(
  state: $ReadOnly<Navigation> = originalState.navigation,
  action: Action,
): $ReadOnly<Navigation> {
  switch (action.type) {
    case actions.CHANGE_TAB: {
      const { payload } = action;

      return { ...state, tabIndex: payload };
    }
    case actions.TOGGLE_SHARE: {
      const { isShareMenuShowing } = state;

      return { ...state, isShareMenuShowing: !isShareMenuShowing };
    }
    default:
      return state;
  }
}
