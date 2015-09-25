import React from 'lib/react';
import i18n from 'service/i18n';
import userSetting from 'service/userSetting';
import { Navbar } from 'component/mdl/layout/navbar';
import { Drawer } from 'component/mdl/layout/drawer';
import { FICard } from 'component/fiCard';

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

  get links() {
    return [{title: i18n.link.investments, url: ''},
            {title: i18n.link.housing, url: ''},
            {title: i18n.link.prediction, url: ''},
          ];
  }

  handleChange(name, value) {
    this.setState({[name]: value});
  }

  render() {
    let handleChange = this.handleChange.bind(this);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref="ficalculator">
        <Navbar status={this.state} />
        <Drawer links={this.links} />
        <main className="mdl-layout__content">

          <h3 className="mdl-title">{i18n.title.current}</h3>

          <FICard
            chartType="line"
            inputType="currency"
            name="networth"
            onChange={handleChange}
            status={this.state} />

          <FICard chartType="bar"
            inputType="currency"
            name="savings"
            onChange={handleChange}
            status={this.state} />

          <h3 className="mdl-title">{i18n.title.prediction}</h3>

          <FICard
            chartType="bar"
            inputType="currency"
            name="goal"
            onChange={handleChange}
            status={this.state} />

          <FICard
            chartType="bar"
            inputType="percent"
            name="ror"
            onChange={handleChange}
            status={this.state} />

          <FICard
            chartType="bar"
            inputType="percent"
            name="inflation"
            onChange={handleChange}
            status={this.state} />

        </main>
      </div>
    );
  }
}
