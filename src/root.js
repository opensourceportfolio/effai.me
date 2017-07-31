import 'css/icon.css';
import 'css/index.css';
import 'css/grid.css';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'app';
import configureStore from 'store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { emptyState } from 'service/user-setting';

const store = configureStore(emptyState);

injectTapEventPlugin();

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
