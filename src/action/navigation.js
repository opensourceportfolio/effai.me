export const CHANGE_TAB = 'CHANGE_TAB';

export function changeTab(tab) {
  return {
    type: CHANGE_TAB,
    tab,
  };
}
