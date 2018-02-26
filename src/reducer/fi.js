import { CHANGE_VALUE, LOADED_USER_DATA } from 'action/fi';
import { type State, type FormInputs } from 'model/state';

export function input(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_VALUE: {
      return {
        ...state,
        [payload.field]: payload.value,
      };
    }
    case LOADED_USER_DATA: {
      return getInputs(payload.userData);
    }
    default:
      return state;
  }
}

export function getInputs(state: State): FormInputs {
  return state.input;
}
