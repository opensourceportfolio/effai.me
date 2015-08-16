import React from 'lib/react';
import formatter from 'service/formatter';

export class Currency extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(event) {
    var value = parseInt(event.target.value);
    value = !value ? 0 : value;
    this.props.onChange(this.props.name, value);
  }

  render() {
    var className = this.props.className + ' input-field';
    return (
      <div className={className}>
        <i className="mdi-editor-attach-money prefix"></i>
        <input className="validate form__input" defaultValue={this.props.value} onChange={this.handleChange.bind(this)} required type="number" />
        <label className="form__label">{formatter.currency(this.props.value)}</label>
        <label className="active" htmlFor={this.props.name}>
          {this.props.placeholder}
        </label>
      </div>
    );
  }
}
