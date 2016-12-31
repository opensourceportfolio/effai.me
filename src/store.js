import { createStore, combineReducers } from 'lib/redux';
import { input } from 'reducer/fi';
import { navigation } from 'reducer/navigation';
import { set } from 'service/userSetting';

function debounce(fn, delay) {
  let timeout = null;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

export default function configureStore(originalState) {
  const key = 'settings';
  const reducers = combineReducers({input, navigation});
  const store = createStore(
    reducers,
    originalState
  );

  store.subscribe(debounce(() => {
    const state = store.getState();

    set(key, state);
  }, 1000));

  return store;
}
