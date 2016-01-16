import React from 'lib/react';
import { connect } from 'lib/react/react-redux';
import { changeValue } from 'action/fi';
import i18n from 'service/i18n';
import { Goal } from 'component/fi/card/goal';
import { Withdrawl } from 'component/fi/card/withdrawl';

class Target extends React.Component {

  handleChange(name, value) {
    this.props.dispatch(changeValue(name, value));
  }

  render() {
    let handleChange = this.handleChange.bind(this);
    let status = this.props.status;

    return (
      <div>
        <h3 className="mdl-title">{i18n.title.target}</h3>

        <Goal status={status} onChange={handleChange} />

        <Withdrawl status={status} onChange={handleChange} />

      </div>
    );
  }
}

export default connect((p) => p)(Target);
