import {createStore} from 'lib/redux';
import { userInput } from 'reducer/fi';


export default function configureStore(initialState) {
  const store = createStore(userInput, initialState);

  return store;
}
