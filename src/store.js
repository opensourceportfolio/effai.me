import { createStore, combineReducers } from 'lib/redux';
import { input } from 'reducer/fi';
import { navigation } from 'reducer/navigation';
import { set } from 'service/userSetting';
import debounce from 'lib/debounce';

export default function configureStore(originalState) {
  const key = 'settings';
  const reducers = combineReducers({input, navigation});
  const store = createStore(
    reducers,
    originalState,
  );

  store.subscribe(debounce(() => {
    const state = store.getState();

    set(key, state);
  }, 1000));

  return store;
}
