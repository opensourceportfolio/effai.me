import React from 'lib/react';
import i18n from 'service/i18n';
import $ from 'jquery';
import { Navbar } from 'component/navbar';
import { Title } from 'component/title';
import { FICard } from 'component/card/fiCard';

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

    this.touchFix();
  }

  touchFix() {
    if ('ontouchstart' in window) {
      $(document).on('focus', 'input', function() {
        $('.navbar-fixed nav').css('position', 'absolute');
      }).on('blur', 'input', function() {
        $('.navbar-fixed nav').css('position', 'fixed');
      });
    }
  }

  handleChange(name, value) {
    this.setState({[name]: value});
  }

  render() {
    var handleChange = this.handleChange.bind(this);

    return (
      <div>
        <Navbar status={this.state} />
        <div className="container">
          <Title value={i18n.title.current} />
          <FICard chartType="line" inputType="currency" name="networth" onChange={handleChange} status={this.state} />
          <FICard chartType="bar" inputType="period" name="savings" onChange={handleChange} status={this.state} />


          <Title value={i18n.title.prediction} />
          <FICard chartType="bar" inputType="period" name="goal" onChange={handleChange} status={this.state} />
          <FICard chartType="bar" inputType="percent" name="ror" onChange={handleChange} status={this.state} />
          <FICard chartType="bar" inputType="percent" name="inflation" onChange={handleChange} status={this.state} />

          <Title value={i18n.title.advanced} />
          <FICard chartType="bar" inputType="percent" name="withdrawl" onChange={handleChange} status={this.state} />

        </div>
      </div>
    );
  }
}
