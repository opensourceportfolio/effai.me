import React from 'lib/react';
import $ from 'lib/jquery';
import componentHandler from 'lib/mdl';
import i18n from 'service/i18n';
import userSetting from 'service/userSetting';
import formatter from 'service/formatter';
import Calculator from 'service/calculator';
import { Navbar } from 'component/mdl/layout/navbar';
import { Networth } from 'component/fi/card/networth';
import { Savings } from 'component/fi/card/savings';
import { Goal } from 'component/fi/card/goal';
import { ROR } from 'component/fi/card/ror';
import { Inflation } from 'component/fi/card/inflation';

export class FICalculator extends React.Component {
  constructor() {
    super();
    this.state = userSetting.get();
  }

  componentDidMount() {
    let node = React.findDOMNode(this.refs.ficalculator);

    componentHandler.upgradeElement(node);
  }

  componentDidUpdate() {
    userSetting.set(this.state);
  }

  handleChange(name, value) {
    let val = $.isNumeric(value) ? parseFloat(value) : null;

    this.setState({[name]: val});
  }

  render() {
    let handleChange = this.handleChange.bind(this);
    let years = Calculator.calculate(this.state);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref="ficalculator">
        <Navbar title={formatter.fiAge(years)} />
        <main className="mdl-layout__content">

          <h3 className="mdl-title">{i18n.title.current}</h3>

          <Networth status={this.state} onChange={handleChange} />

          <Savings status={this.state} onChange={handleChange} />

          <h3 className="mdl-title">{i18n.title.prediction}</h3>

          <Goal status={this.state} onChange={handleChange} />

          <ROR status={this.state} onChange={handleChange} />

          <Inflation status={this.state} onChange={handleChange} />

          <a className="fi-opensource" href="https://github.com/opensourceportfolio/ficalculator3/">open source on github</a>
        </main>
      </div>
    );
  }
}
