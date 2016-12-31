import React from 'lib/react';
import ReactDOM from 'lib/react-dom';
import { Provider } from 'lib/react-redux';
import App from 'app';
import 'lib/mdl/dist/material.blue-orange.min.css';
import 'css/icon.css';
import 'css/mdl.css';
import 'css/chartist.css';
import 'css/index.css';
import configureStore from 'store';
import { get } from 'service/userSetting';

const key = 'settings';


get(key).then((settings) => {
  const store = configureStore(settings);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-ficalculator')
  );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
