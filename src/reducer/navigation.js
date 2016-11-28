import { CHANGE_TAB } from 'action/navigation';
import { get } from 'service/userSetting';

const previousState = get();

export function navigation(state = previousState.navigation, action) {
  switch (action.type) {
  case CHANGE_TAB:
    return Object.assign({}, state, {tabIndex: action.tab});
  default:
    return state;
  }
}
