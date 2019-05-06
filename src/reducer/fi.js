// @flow
import { originalState } from 'service/user-setting';
import { CHANGE_VALUE, LOADED_USER_DATA } from 'action/fi';
import { type State, type FormInputs } from 'model/state';
import type { Action } from 'model/redux';

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
