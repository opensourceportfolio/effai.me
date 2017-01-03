import React from 'lib/react';
import ReactDOM from 'lib/react-dom';
import { Provider } from 'lib/react-redux';
import App from 'app';
import 'lib/mdl/dist/material.blue-orange.min.css';
import 'css/icon.css';
import 'css/mdl.css';
import 'css/index.css';
import configureStore from 'store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { get, emptyState } from 'service/userSetting';
import { loadData } from 'action/fi';

const key = 'settings';
const store = configureStore(emptyState);

injectTapEventPlugin();

get(key).then((settings) => {
  store.dispatch(loadData(settings));
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app-effai')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
