import React from 'lib/react';
import ReactDOM from 'lib/react/dom';
import Router from 'lib/react/router';
import { FICalculator } from 'component/ficalculator';

let Route = Router.Route;
let routes = (
  <Route handler={FICalculator} />
);

Router.run(routes, Router.HashLocation, (Root) => {
  ReactDOM.render(<Root/>, document.getElementById('app-ficalculator'));
});
