import React from 'lib/react';
import ReactDOM from 'lib/react-dom';
import { Router, Route, Redirect, browserHistory } from 'lib/react-router';
import App from 'app';
import Information from 'component/page/information';
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
    <Redirect from="/" to="information"/>
    <Route path="/" component={App}>
      <Route path="information" component={Information} />
      <Route path="chart" component={Chart} />
      <Redirect from="*" to="information"/>
    </ Route>
  </ Router>
;

ReactDOM.render(routes, document.getElementById('app-ficalculator'));
