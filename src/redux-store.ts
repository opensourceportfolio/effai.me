import * as Redux from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { input } from './reducer/fi';
import { navigation } from './reducer/navigation';

export const key = 'settings';

export default function configureStore(originalState) {
  const reducers = Redux.combineReducers({ input, navigation });
  const middleware: Redux.Middleware[] = [];

  middleware.push(thunk);

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  const store = Redux.createStore(
    reducers,
    originalState,
    Redux.applyMiddleware(...middleware),
  );

  return store;
}
