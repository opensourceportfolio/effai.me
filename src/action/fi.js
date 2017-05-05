export const CHANGE_VALUE = 'fi/change-value';

export function changeValue(field, value) {
  return {
    type: CHANGE_VALUE,
    field,
    value,
  };
}

export const LOAD_DATA = 'fi/load-data';

export function loadData(field, value) {
  return {
    type: LOAD_DATA,
    value,
  };
}
