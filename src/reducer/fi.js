import { CHANGE_VALUE } from 'action/fi';

export function input(state = {}, action) {
  let copy;

  switch (action.type) {
  case CHANGE_VALUE:
    copy = Object.assign({}, state);

    copy[action.field] = action.value;

    return copy;
  default:
    return state;
  }
}
