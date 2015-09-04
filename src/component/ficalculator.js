import React from 'lib/react';
import i18n from 'service/i18n';
import $ from 'jquery';
import { Navbar } from 'component/navbar';
import { FICard } from 'component/fiCard';

export class FICalculator extends React.Component {
  constructor() {
    super();
    this.state = {
      networth: 50000,
      savings: 1000,
      savingsRate: 1,
      goal: 50000,
      goalRate: 2,
      ror: 8,
      inflation: 3,
      withdrawl: 4,
    };
  }

  componentDidMount() {
    var node = React.findDOMNode(this.refs.ficalculator);
    componentHandler.upgradeElement(node);
  }

  handleChange(name, value) {
    this.setState({[name]: value});
  }

  render() {
    var handleChange = this.handleChange.bind(this);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref="ficalculator">
        <Navbar status={this.state} />
        <main className="mdl-layout__content">
          <h3 className="mdl-title">{i18n.title.current}</h3>
          <FICard chartType="line" inputType="currency" name="networth" onChange={handleChange} status={this.state} />
          <FICard chartType="bar" inputType="period" name="savings" onChange={handleChange} status={this.state} />

          <h3 className="mdl-title">{i18n.title.prediction}</h3>
          <FICard chartType="bar" inputType="period" name="goal" onChange={handleChange} status={this.state} />
          <FICard chartType="bar" inputType="percent" name="ror" onChange={handleChange} status={this.state} />
          <FICard chartType="bar" inputType="percent" name="inflation" onChange={handleChange} status={this.state} />

          <h3 className="mdl-title">{i18n.title.advanced}</h3>
          <FICard chartType="bar" inputType="percent" name="withdrawl" onChange={handleChange} status={this.state} />
        </main>
      </div>
    );
  }
}
