import { FIAction } from 'action/fi';
import { NavigationAction } from 'action/navigation';
import { State } from 'model/state';
import { ThunkDispatch as ThunkDispatchRedux } from 'redux-thunk';

export type GetState = () => State;
export type Action = NavigationAction | FIAction;
export type ThunkDispatch = ThunkDispatchRedux<State, unknown, FIAction>;
export type PromiseAction = Promise<Action>;
