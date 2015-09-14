import React from 'lib/react';
import Router from 'lib/react/router';
import { FICalculator } from 'component/ficalculator';

var Route = Router.Route;
var routes = (
  <Route handler={FICalculator} />
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

React.render(
  <FICalculator />,
  document.getElementsByTagName('body')[0]
);
