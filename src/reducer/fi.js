import { CHANGE_VALUE, LOAD_DATA } from 'action/fi';
import { originalState } from 'service/userSetting';

export function input(state = {}, action) {
  let copy;

  switch (action.type) {
  case CHANGE_VALUE:
    copy = Object.assign({}, state);

    copy[action.field] = action.value;

    return copy;
  case LOAD_DATA:
    return action.value || getInputs(originalState);
  default:
    return state;
  }
}

export function getInputs(state) {
  return state.input;
}
