import React from 'lib/react';
import { createStore } from 'lib/redux';
import componentHandler from 'lib/mdl';
import { Provider } from 'lib/react/react-redux';
import { userInput } from 'reducer/fi';
import { loadData } from 'action/fi';
import { meta } from 'service/meta';
import { i18n } from 'service/i18n';
import { get, set } from 'service/userSetting';
import { years } from 'service/calculator';
import Header from 'component/mdl/layout/header';

const store = createStore(userInput);

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

  render() {
    const status = this.state;
    const yrs = years(status);
    const options = { row: [
      {text: i18n.header.links.known, url: 'known', isActive: false},
      {text: i18n.header.links.prediction, url: 'prediction'},
      {text: i18n.header.links.target, url: 'target'},
    ]};

    return (
      <Provider store={store}>
        <div className="mdl-layout__container">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header is-upgraded">
            <Header title={App.fiAge(yrs)} options={options} />
            <main className="mdl-layout__content" ref="content">

              {React.cloneElement(this.props.children, { status })}

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
