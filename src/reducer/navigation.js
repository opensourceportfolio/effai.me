import { CHANGE_TAB } from 'action/navigation';

export function navigation(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TAB:
      return { ...state, tabIndex: payload.tab };
    default:
      return state;
  }
}
