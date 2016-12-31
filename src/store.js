import { createStore, combineReducers, applyMiddleware } from 'lib/redux';
import thunkMiddleware from 'lib/redux-thunk';
import { input } from 'reducer/fi';
import { navigation } from 'reducer/navigation';

export default function configureStore(originalState) {
  const reducers = combineReducers({input, navigation});
  const store = createStore(
    reducers,
    originalState,
    applyMiddleware(
      thunkMiddleware,
    ),
  );

  return store;
}
