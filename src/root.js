import React from 'lib/react';
import ReactDOM from 'lib/react/dom';
import { Router, Route, IndexRoute } from 'lib/react/router';
import App from 'app';
import Known from 'component/page/known';
import Prediction from 'component/page/prediction';
import Target from 'component/page/target';

let routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Known}/>
      <Route path="known" component={Known} />
      <Route path="prediction" component={Prediction} />
      <Route path="target" component={Target} />
    </ Route>
  </ Router>
);

ReactDOM.render(routes, document.getElementById('app-ficalculator'));
