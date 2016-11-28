import { createStore, combineReducers } from 'lib/redux';
import { input } from 'reducer/fi';
import { navigation } from 'reducer/navigation';


export default function configureStore(initialState) {
  const reducers = combineReducers({input, navigation});
  const store = createStore(reducers, initialState);

  return store;
}
