import React from 'lib/react';
import { connect } from 'lib/react-redux';
import { changeValue } from 'action/fi';
import { i18n } from 'service/i18n';
import ROR from 'component/fi/card/ror';
import Inflation from 'component/fi/card/inflation';

class Prediction extends React.Component {

  handleChange(name, value) {
    this.props.dispatch(changeValue(name, value));
  }

  render() {
    const handleChange = this.handleChange.bind(this);
    const status = this.props.status;

    return (
      <div>
        <h3 className="mdl-title">{i18n.title.prediction}</h3>

        <ROR status={status} onChange={handleChange} />

        <Inflation status={status} onChange={handleChange} />

      </div>
    );
  }
}

export default connect((p) => p)(Prediction);
