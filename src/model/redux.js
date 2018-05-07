// @flow
import type { State } from 'model/state';
import type { NavigationAction } from 'action/navigation';
import type { FIAction } from 'action/fi';

export type GetState = () => State;
export type Action = NavigationAction | FIAction;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => void;
