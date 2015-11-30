import React from 'lib/react';
import { connect } from 'lib/react/react-redux';
import { changeValue } from 'action/fi';
import i18n from 'service/i18n';
import { Networth } from 'component/fi/card/networth';
import { Savings } from 'component/fi/card/savings';
import { Goal } from 'component/fi/card/goal';
import { ROR } from 'component/fi/card/ror';
import { Inflation } from 'component/fi/card/inflation';

class FICalculator extends React.Component {

  handleChange(name, value) {
    this.props.dispatch(changeValue(name, value));
  }

  render() {
    let handleChange = this.handleChange.bind(this);
    let status = this.props.status;

    return (
      <div>
        <h3 className="mdl-title">{i18n.title.current}</h3>

        <Networth status={status} onChange={handleChange} />

        <Savings status={status} onChange={handleChange} />

        <h3 className="mdl-title">{i18n.title.prediction}</h3>

        <Goal status={status} onChange={handleChange} />

        <ROR status={status} onChange={handleChange} />

        <Inflation status={status} onChange={handleChange} />

        <h3 className="mdl-title">{i18n.title.housing}</h3>

      </div>
    );
  }
}

export default connect((p) => p)(FICalculator);
