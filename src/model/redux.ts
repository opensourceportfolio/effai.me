import { FIAction } from 'action/fi';
import { NavigationAction } from 'action/navigation';
import { State } from 'model/state';
import { ThunkDispatch } from 'redux-thunk';

export type GetState = () => State;
export type Action = NavigationAction | FIAction;
export type ThunkDispatch = ThunkDispatch<State, {}, FIAction>;
export type PromiseAction = Promise<Action>;
