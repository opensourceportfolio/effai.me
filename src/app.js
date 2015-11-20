import React from 'lib/react';
import ReactDOM from 'lib/react/dom';
import $ from 'lib/jquery';
import { Router, Route, IndexRoute } from 'lib/react/router';
import i18n from 'service/i18n';
import userSetting from 'service/userSetting';
import formatter from 'service/formatter';
import Calculator from 'service/calculator';
import { Navbar } from 'component/mdl/layout/navbar';
import { FICalculator } from 'component/ficalculator';
import { FISettings } from 'component/fisettings';

class App extends React.Component {

  componentWillMount() {
    this.state = userSetting.get();
  }

  componentDidUpdate() {
    userSetting.set(this.state);
  }

  handleChange(name, value) {
    let val = $.isNumeric(value) ? parseFloat(value) : null;

    this.setState({[name]: val});
  }

  render() {
    let status = this.state;
    let years = Calculator.calculate(status);
    let options = [{text: i18n.menu.option, url: '/settings'}];
    let handleChange = this.handleChange.bind(this);

    return (
      <div className="mdl-layout__container">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref="ficalculator">
          <Navbar title={formatter.fiAge(years)} options={options} />
          <main className="mdl-layout__content">

            {React.cloneElement(this.props.children, { handleChange, status })}

            <a className="fi-opensource" href="https://github.com/opensourceportfolio/ficalculator3/">open source on github</a>
          </main>
        </div>
      </div>
    );
  }
}

let routes = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={FICalculator} />
      <Route path="settings" component={FISettings} />
    </ Route>
  </ Router>
);

ReactDOM.render(routes, document.getElementById('app-ficalculator'));
