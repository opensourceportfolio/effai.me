import debounce from 'debounce';
import { GetState } from 'model/redux';
import { FormInputs, State } from 'model/state';
import { Dispatch } from 'redux';
import { key } from 'redux-store';
import { ThunkAction } from 'redux-thunk';
import { get, set } from 'service/user-setting';
import { PayloadAction, SimpleAction } from 'utils/react-redux';

const write = debounce((state: State) => {
  set(key, state.input);
}, 1000);

export const CHANGE_VALUE: 'fi/change-value' = 'fi/change-value';
type ChangeFieldAction = PayloadAction<
  typeof CHANGE_VALUE,
  Partial<FormInputs>
>;
export function changeValue(
  payload: Partial<FormInputs>,
): ThunkAction<void, State, {}, FIAction> {
  return function(dispatch: Dispatch, getState: GetState) {
    const action: ChangeFieldAction = { type: CHANGE_VALUE, payload };

    dispatch(action);
    return write(getState());
  };
}

export const LOAD_USER_DATA: 'fi/load-user-data' = 'fi/load-user-data';
export const LOADED_USER_DATA: 'fi/loaded-user-data' = 'fi/loaded-user-data';
type LoadUserDataAction = SimpleAction<typeof LOAD_USER_DATA>;
type LoadedUserDataAction = PayloadAction<typeof LOADED_USER_DATA, FormInputs>;
export function loadUserData(): ThunkAction<void, State, {}, FIAction> {
  return function(dispatch: Dispatch) {
    dispatch({ type: LOAD_USER_DATA });

    return get(key).then((userData: FormInputs) =>
      dispatch({ type: LOADED_USER_DATA, payload: userData }),
    );
  };
}

export type FIAction =
  | ChangeFieldAction
  | LoadUserDataAction
  | LoadedUserDataAction;
