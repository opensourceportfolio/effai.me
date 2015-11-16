import React from 'lib/react';
import ReactDOM from 'lib/react/dom';
import { Router, Route } from 'lib/react/router';
import { FICalculator } from 'component/ficalculator';
import { FISettings } from 'component/fisettings';

let routes = (
  <Router>
    <Route path="/settings" component={FISettings} />
    <Route path="*" component={FICalculator} />
  </ Router>
);

ReactDOM.render(routes, document.getElementById('app-ficalculator'));
