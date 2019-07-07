import { input } from 'reducer/fi';
import { navigation } from 'reducer/navigation';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

export const key = 'settings';

export default function configureStore(originalState) {
  const reducers = combineReducers({ input, navigation });
  const middleware = [];

  middleware.push(thunk);

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  const store = createStore(
    reducers,
    originalState,
    applyMiddleware(...middleware),
  );

  return store;
}
