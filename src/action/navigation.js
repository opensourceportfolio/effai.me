export const CHANGE_TAB = 'navigation/change-tab';

export function changeTab(tab) {
  return {
    type: CHANGE_TAB,
    tab,
  };
}
