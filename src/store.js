import {createStore} from 'lib/redux';
import { userInput } from 'reducer/fi';


export default function configureStore(initialState) {
  const store = createStore(userInput, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducer/fi', () => {
      const nextReducer = require('reducer/fi').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
