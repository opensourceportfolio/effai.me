import React from 'lib/react';
import configureStore from 'store';
import componentHandler from 'lib/mdl';
import 'lib/mdl/dist/material.blue-orange.min.css';
import { Provider } from 'lib/react-redux';
import SwipeableViews from 'lib/react-swipeable-views';
import { loadData } from 'action/fi';
import { changeTab } from 'action/navigation';
import { meta } from 'service/meta';
import { i18n } from 'service/i18n';
import { get, set } from 'service/userSetting';
import { years } from 'service/calculator';
import Header from 'component/mdl/layout/header';
import Information from 'component/page/information';
import Chart from 'component/page/chart';

const store = configureStore();

export default class App extends React.Component {

  componentWillMount() {
    const data = get();

    store.subscribe(() => {
      const state = store.getState();

      this.setState(state);
      set(state);
    });

    store.dispatch(loadData(data));
  }

  componentDidMount() {
    componentHandler.upgradeAllRegistered();
  }

  navigate(tabIndex) {
    store.dispatch(changeTab(tabIndex));
  }

  render() {
    const { input, navigation } = this.state;
    const yrs = years(input);
    const onNavigation = (i) => this.navigate(i);
    const options = {
      tabIndex: navigation.tabIndex,
      row: [
        {text: i18n.header.links.known, onNavigation},
        {text: i18n.header.links.chart, onNavigation},
      ]
    };

    return (
      <Provider store={store}>
        <div className="mdl-layout__container">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header is-upgraded">
            <Header title={App.fiAge(yrs)} options={options} />
            <main className="mdl-layout__content" ref="content">
              <SwipeableViews onChangeIndex={(i) => this.navigate(i)}>
                <div>
                  <Information status={status} />
                </div>
                <div>
                  <Chart status={status} />
                </div>
              </ SwipeableViews>
              <a className="fi-opensource" href="https://github.com/opensourceportfolio/ficalculator3/">open source on github</a>
            </main>
          </div>
        </div>
      </Provider>
    );
  }


  static fiAge(yrs) {
    let age = 0;

    if (yrs <= 0) {
      age = i18n.fiStatus.done;
    } else if (isNaN(yrs) || yrs > meta.range) {
      age = i18n.fiStatus.never;
    } else {
      age = i18n.fiStatus.formatter(yrs);
    }

    return `FI in: ${age}`;
  }
}
