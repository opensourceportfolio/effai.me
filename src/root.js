import React from 'lib/react';
import ReactDOM from 'lib/react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, Redirect, browserHistory } from 'lib/react-router';
import App from 'app';
import Known from 'component/page/known';
import Prediction from 'component/page/prediction';
import Target from 'component/page/target';
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
      <Route path="prediction" component={Prediction} />
      <Route path="target" component={Target} />
      <Redirect from="*" to="known"/>
    </ Route>
  </ Router>
;

const app =
  <AppContainer>
    {routes}
  </AppContainer>
;

ReactDOM.render(app, document.getElementById('app-ficalculator'));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    ReactDOM.render(app, document.getElementById('root'));
  });
}
