// @flow
import { CHANGE_VALUE, LOADED_USER_DATA } from 'action/fi';
import { Action } from 'model/redux';
import { FormInputs State } from 'model/state';
import { originalState } from 'service/user-setting';

export function input(
  state: $ReadOnly<FormInputs> = originalState.input,
  action: Action,
): $ReadOnly<FormInputs> {
  switch (action.type) {
    case CHANGE_VALUE: {
      const { payload } = action;

      return {
        ...state,
        ...payload,
      };
    }
    case LOADED_USER_DATA: {
      const { payload } = action;

      return payload;
    }
    default:
      return state;
  }
}

export function getInputs(state: State): FormInputs {
  return state.input;
}
