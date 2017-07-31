import { CHANGE_VALUE, LOADED_USER_DATA } from "action/fi";

export function input(state = {}, action) {
  switch (action.type) {
    case CHANGE_VALUE: {
      return {
        ...state,
        [action.field]: action.value
      };
    }
    case LOADED_USER_DATA: {
      return getInputs(action.userData);
    }
    default:
      return state;
  }
}

export function getInputs(state) {
  return state.input;
}
