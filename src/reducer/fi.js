import { LOAD_DATA, CHANGE_VALUE } from 'action/fi';
import { get } from 'service/userSetting';

const previousState = get();

export function userInput(state = previousState, action) {
  let copy;

  switch (action.type) {
  case CHANGE_VALUE:
    copy = Object.assign({}, state);

    copy[action.field] = action.value;

    return copy;
  case LOAD_DATA:
  default:
    return state;
  }
}
