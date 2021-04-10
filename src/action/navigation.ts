import { PayloadAction, SimpleAction } from 'utils/react-redux';

export const CHANGE_TAB = 'navigation/change-tab' as const;
export type ChangeTabAction = PayloadAction<typeof CHANGE_TAB, number>;
export function changeTab(tabIndex: number): ChangeTabAction {
  return {
    type: CHANGE_TAB,
    payload: tabIndex,
  };
}

export const TOGGLE_SHARE = 'navigation/toggle-share' as const;
export type ToggleShareAction = SimpleAction<typeof TOGGLE_SHARE>;
export function toggleShare(): ToggleShareAction {
  return {
    type: TOGGLE_SHARE,
  };
}

export type NavigationAction = ChangeTabAction | ToggleShareAction;
