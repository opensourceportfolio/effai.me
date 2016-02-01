import $ from 'lib/jquery';
import { LOAD_DATA, CHANGE_VALUE } from 'action/fi';
import { get } from 'service/userSetting';

let previousState = get();

export function userInput(state = previousState, action) {
  switch (action.type) {
  case CHANGE_VALUE:
    let copy = $.extend({}, state);

    copy[action.field] = action.value;
    return copy;
  case LOAD_DATA:
  default:
    return state;
  }
}
