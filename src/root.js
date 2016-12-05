import React from 'lib/react';
import ReactDOM from 'lib/react-dom';
import App from 'app';
import 'css/icon.css';
import 'css/mdl.css';
import 'css/chartist.css';
import 'css/index.css';

ReactDOM.render(<App />, document.getElementById('app-ficalculator'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
