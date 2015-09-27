import React from 'lib/react';
import componentHandler from 'lib/mdl';
import i18n from 'service/i18n';
import userSetting from 'service/userSetting';
import formatter from 'service/formatter';
import range from 'service/range';
import meta from 'service/meta';
import { Navbar } from 'component/mdl/layout/navbar';
import { FICard } from 'component/fiCard';
import { BarChart } from 'component/chart/bar';
import { LineChart } from 'component/chart/line';
import { Currency } from 'component/form/currency';
import { Percent } from 'component/form/percent';

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
    this.setState({[name]: value});
  }

  render() {
    let handleChange = this.handleChange.bind(this);

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref="ficalculator">
        <Navbar title={formatter.fiAge(this.state)} />
        <main className="mdl-layout__content">

          <h3 className="mdl-title">{i18n.title.current}</h3>

          <FICard
            chart={{type: LineChart, data: range.networth(this.state)}}
            input={{type: Currency, meta: meta.networth}}
            name="networth"
            text={i18n.networth}
            onChange={handleChange}
            status={this.state} />

          <FICard
            chart={{type: BarChart, data: range.savings(this.state)}}
            input={{type: Currency, meta: meta.savings}}
            name="savings"
            text={i18n.savings}
            onChange={handleChange}
            status={this.state} />

          <h3 className="mdl-title">{i18n.title.prediction}</h3>

          <FICard
            chart={{type: BarChart, data: range.goal(this.state)}}
            input={{type: Currency, meta: meta.goal}}
            name="goal"
            text={i18n.goal}
            onChange={handleChange}
            status={this.state} />

          <FICard
            chart={{type: BarChart, data: range.ror(this.state)}}
            input={{type: Percent, meta: meta.ror}}
            name="ror"
            text={i18n.ror}
            onChange={handleChange}
            status={this.state} />

          <FICard
            chart={{type: BarChart, data: range.inflation(this.state)}}
            input={{type: Percent, meta: meta.inflation}}
            name="inflation"
            text={i18n.inflation}
            onChange={handleChange}
            status={this.state} />

          <a className="fi-opensource" href="https://github.com/opensourceportfolio/ficalculator3/">open source on github</a>
        </main>
      </div>
    );
  }
}
