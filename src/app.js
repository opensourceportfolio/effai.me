import React from 'lib/react';
import { createStore } from 'lib/redux';
import { Provider } from 'lib/react/react-redux';
import { userInput } from 'reducer/fi';
import { loadData } from 'action/fi';
import i18n from 'service/i18n';
import userSetting from 'service/userSetting';
import formatter from 'service/formatter';
import Calculator from 'service/calculator';
import { Navbar } from 'component/mdl/layout/navbar';

let store = createStore(userInput);

export default class App extends React.Component {

  componentWillMount() {
    let data = userSetting.get();

    store.subscribe(() => {
      let state = store.getState();

      this.setState(state);
      userSetting.set(state);
    });

    store.dispatch(loadData(data));
  }

  render() {
    let status = this.state;
    let years = Calculator.calculate(status);
    let options = [{text: i18n.menu.option, url: '/settings'}];

    return (
      <Provider store={store}>
        <div className="mdl-layout__container">
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref="ficalculator">
            <Navbar title={formatter.fiAge(years)} options={options} />
            <main className="mdl-layout__content">

              {React.cloneElement(this.props.children, { status })}

              <a className="fi-opensource" href="https://github.com/opensourceportfolio/ficalculator3/">open source on github</a>
            </main>
          </div>
        </div>
      </Provider>
    );
  }
}
