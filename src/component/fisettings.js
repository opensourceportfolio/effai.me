import React from 'lib/react';
import i18n from 'service/i18n';
import meta from 'service/meta';
import { Percent } from 'component/form/percent';

export class FISettings extends React.Component {

  render() {
    let { handleChange, status } = this.props;

    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--2-col"></div>
        <div className="mdl-cell mdl-cell--10-col mdl-cell--10-col-phone">
          <Percent
            name="withdrawl"
            onChange={handleChange}
            placeholder={i18n.withdrawl.placeholder}
            value={status.withdrawl}
            rangeInfo={meta.withdrawl} />
        </div>
      </div>
    );
  }

}
