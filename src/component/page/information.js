import React from 'lib/react';
import { connect } from 'lib/react-redux';
import { changeValue } from 'action/fi';
import Future from 'component/fi/card/future';
import Financial from 'component/fi/card/financial';
import House from 'component/fi/card/house';

class Information extends React.Component {

  handleChange(name, value) {
    this.props.dispatch(changeValue(name, value));
  }

  render() {
    const handleChange = this.handleChange.bind(this);
    const status = this.props.status;

    return (
      <div id="information">
        <Financial status={status} onChange={handleChange} />

        <House status={status} onChange={handleChange} />

        <Future status={status} onChange={handleChange} />
      </div>
    );
  }
}

export default connect((p) => p)(Information);
