import React from 'lib/react';
import configureStore from 'store';
import componentHandler from 'lib/mdl';
import 'lib/mdl/dist/material.blue-orange.min.css';
import { Provider } from 'lib/react-redux';
import { loadData } from 'action/fi';
import { get, set, originalState } from 'service/userSetting';
import FiHeader from 'component/fi/fi-header';
import FiSwipeableViews from 'component/fi/fi-swipeable-view';

const store = configureStore(originalState);

export default class App extends React.Component {

  componentWillMount() {
    const key = 'settings';

    get(key).then((settings) => {
      store.dispatch(loadData(settings));
    });

    store.subscribe(() => {
      const state = store.getState();

      set(key, state);
    });
  }

  componentDidMount() {
    componentHandler.upgradeAllRegistered();
  }

  render() {

    return (
      <Provider store={store}>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header is-upgraded">
          <FiHeader />
          <main className="mdl-layout__content" ref="content">
            <FiSwipeableViews />
            {/* <a className="fi-opensource" href="https://github.com/opensourceportfolio/ficalculator3/">open source on github</a> */}
          </main>
        </div>
      </Provider>
    );
  }
}
