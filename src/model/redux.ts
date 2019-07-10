import { FIAction } from 'action/fi';
import { NavigationAction } from 'action/navigation';
import { State } from 'model/state';
import { Dispatch } from 'redux';

export type GetState = () => State;
export type Action = NavigationAction | FIAction;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => void;
export type PromiseAction = Promise<Action>;
