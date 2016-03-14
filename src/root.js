import React from 'lib/react';
import ReactDOM from 'lib/react/dom';
import { Router, Route, Redirect, browserHistory } from 'lib/react/router';
import App from 'app';
import Known from 'component/page/known';
import Prediction from 'component/page/prediction';
import Target from 'component/page/target';

const routes = (
  <Router history={browserHistory}>
    <Redirect from="/" to="known"/>
    <Route path="/" component={App}>
      <Route path="known" component={Known} />
      <Route path="prediction" component={Prediction} />
      <Route path="target" component={Target} />
      <Redirect from="*" to="known"/>
    </ Route>
  </ Router>
);

ReactDOM.render(routes, document.getElementById('app-ficalculator'));
