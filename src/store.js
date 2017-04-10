import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import debounce from 'debounce';
import { input } from 'reducer/fi';
import { navigation } from 'reducer/navigation';
import { set } from 'service/userSetting';

export default function configureStore(originalState) {
  const key = 'settings';
  const reducers = combineReducers({input, navigation});
  const middleware = [];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  const store = createStore(
    reducers,
    originalState,
    applyMiddleware(...middleware),
  );

  store.subscribe(debounce(() => {
    const state = store.getState();

    set(key, state);
  }, 1000));

  return store;
}
