import debounce from "debounce";
import { key } from "store";
import { get, set } from "service/user-setting";

export const CHANGE_VALUE = "fi/change-value";
export function changeValue(field, value) {
  return function(dispatch) {
    dispatch({ type: CHANGE_VALUE, field, value });
    return dispatch(writeUserData());
  };
}

export const WRITE_USER_DATA = "fi/write-user-data";
export function writeUserData() {
  const writer = debounce(state => {
    set(key, state);
  }, 1000);

  return function(dispatch, getState) {
    writer(getState());
  };
}

export const LOAD_USER_DATA = "fi/load-user-data";
export const LOADED_USER_DATA = "fi/loaded-user-data";
export function loadUserData() {
  return function(dispatch) {
    dispatch({ type: LOAD_USER_DATA });

    return get(key).then(userData =>
      dispatch({ type: LOADED_USER_DATA, userData })
    );
  };
}
