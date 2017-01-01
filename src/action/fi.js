export const CHANGE_VALUE = 'CHANGE_VALUE';

export function changeValue(field, value) {
  return {
    type: CHANGE_VALUE,
    field,
    value,
  };
}

export const LOAD_DATA = 'LOAD_DATA';

export function loadData(field, value) {
  return {
    type: LOAD_DATA,
    value,
  };
}
