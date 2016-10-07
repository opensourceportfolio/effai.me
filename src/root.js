import React from 'lib/react';
import ReactDOM from 'lib/react-dom';
import { Router, Route, Redirect, browserHistory } from 'lib/react-router';
import App from 'app';
import Known from 'component/page/known';
import Chart from 'component/page/chart';
import 'css/icon.css';
import 'css/mdl.css';
import 'css/chartist.css';
import 'css/index.css';

const scrollTop = () => {
  document.getElementsByTagName('main')[0].scrollTop = 0;
};

const routes =
  <Router onUpdate={() => scrollTop()} history={browserHistory}>
    <Redirect from="/" to="known"/>
    <Route path="/" component={App}>
      <Route path="known" component={Known} />
      <Route path="chart" component={Chart} />
      <Redirect from="*" to="known"/>
    </ Route>
  </ Router>
;

ReactDOM.render(routes, document.getElementById('app-ficalculator'));
