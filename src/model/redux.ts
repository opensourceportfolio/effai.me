import { FIAction } from 'action/fi';
import { NavigationAction } from 'action/navigation';
import { State } from 'model/state';

export type GetState = () => State;
export type Action = NavigationAction | FIAction;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => void;
