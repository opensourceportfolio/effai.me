import React from 'lib/react';
import ReactDOM from 'lib/react/dom';
import { Router, Route, IndexRoute } from 'lib/react/router';
import App from 'app';
import FICalculator from 'component/ficalculator';
import FISettings from 'component/fisettings';

let routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={FICalculator} />
      <Route path="settings" component={FISettings} />
    </ Route>
  </ Router>
);

ReactDOM.render(routes, document.getElementById('app-ficalculator'));
