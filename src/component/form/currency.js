import React from 'lib/react';
import $ from 'lib/jquery';
import componentHandler from 'lib/mdl';
import formatter from 'service/formatter';

export class Currency extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let node = React.findDOMNode(this.refs.currency);

    componentHandler.upgradeElement(node);
  }

  handleChange(event) {
    let value = parseInt(event.target.value);

    value = $.isNumeric(value) ? value : '';
    this.props.onChange(this.props.name, value);
  }

  render() {
    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield__masked" ref="currency">
        <input className="mdl-textfield__input"
          defaultValue={this.props.value}
          onChange={this.handleChange.bind(this)}
          pattern="\d*"
          required
          type="number" />
        <label className="mdl-textfield__mask">
          {formatter.currency(this.props.value)}
        </label>
        <label className="mdl-textfield__label" htmlFor={this.props.name}>
          {this.props.placeholder}
        </label>
      </div>
    );
  }
}
