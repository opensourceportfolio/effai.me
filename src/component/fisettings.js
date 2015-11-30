import React from 'lib/react';
import { connect } from 'lib/react/react-redux';
import { changeValue } from 'action/fi';
import i18n from 'service/i18n';
import meta from 'service/meta';
import { Percent } from 'component/form/percent';

class FISettings extends React.Component {

  handleChange(name, value) {
    this.props.dispatch(changeValue(name, value));
  }

  render() {
    let { status } = this.props;
    let handleChange = this.handleChange.bind(this);

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--2-col"></div>
        <div className="mdl-cell mdl-cell--10-col mdl-cell--10-col-phone">
          <Percent
            name="withdrawl"
            onChange={handleChange}
            text={{placeholder: i18n.withdrawl.placeholder}}
            value={status.withdrawl}
            rangeInfo={meta.withdrawl} />
        </div>
      </div>
    );
  }

}

export default connect((p) => p)(FISettings);
