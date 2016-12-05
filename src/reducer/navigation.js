import { CHANGE_TAB } from 'action/navigation';

export function navigation(state = {}, action) {
  switch (action.type) {
  case CHANGE_TAB:
    return Object.assign({}, state, {tabIndex: action.tab});
  default:
    return state;
  }
}
