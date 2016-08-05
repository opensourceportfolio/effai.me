import React from 'lib/react';
import { connect } from 'lib/react-redux';
import { changeValue } from 'action/fi';
import { i18n } from 'service/i18n';
import Networth from 'component/fi/card/networth';
import Savings from 'component/fi/card/savings';

class Known extends React.Component {

  handleChange(name, value) {
    this.props.dispatch(changeValue(name, value));
  }

  render() {
    const handleChange = this.handleChange.bind(this);
    const status = this.props.status;

    return (
      <div>
        <h3 className="mdl-title">{i18n.title.current}</h3>

        <Networth status={status} onChange={handleChange} />

        <Savings status={status} onChange={handleChange} />

      </div>
    );
  }
}

export default connect((p) => p)(Known);
