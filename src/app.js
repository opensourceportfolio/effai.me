import React from 'lib/react';
import Router from 'lib/react/router';
import { FICalculator } from 'component/ficalculator';

let Route = Router.Route;
let routes = (
  <Route handler={FICalculator} />
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

React.render(
  <FICalculator />,
  document.getElementsByTagName('body')[0]
);
