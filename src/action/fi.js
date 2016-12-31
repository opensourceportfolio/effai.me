export const CHANGE_VALUE = 'CHANGE_VALUE';

export function changeValue(field, value) {
  return {
    type: CHANGE_VALUE,
    field,
    value,
  };
}
