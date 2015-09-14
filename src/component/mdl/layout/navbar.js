import React from 'lib/react';
import Calculator from 'service/calculator';
import i18n from 'service/i18n';
import meta from 'service/meta';

export class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.calculator = new Calculator();
    this.i18n = i18n;
  }
  render() {
    let years = this.calculator.calculate(this.props.status);
    let fiAge = 0;

    if (years <= 0){
      fiAge = this.i18n.fiStatus.done;
    } else if (isNaN(years) || years > meta.range) {
      fiAge = this.i18n.fiStatus.never;
    } else {
      fiAge = this.i18n.fiStatus.formatter(years);
    }

    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout-icon"></div>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            FI in: {fiAge}
          </span>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }
}
