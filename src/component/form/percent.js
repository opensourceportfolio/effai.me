import React from 'lib/react';
import meta from 'service/meta';

export class Percent extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    var value = parseInt(event.target.value);
    value = !value ? 0 : value;
    this.props.onChange(this.props.name, value);
  }

  render() {
    var name = this.props.name;
    var metadata = meta[name];

    return (
      <div className="input-field col s12">
        <i className="icon-percent prefix"></i>
        <input className="validate" defaultValue={this.props.value} max={metadata.max} min={metadata.min} onChange={this.handleChange.bind(this)} required step={metadata.step} type="range" />
        <label className="active" htmlFor={name}>
          {this.props.placeholder} ({this.props.value}%)
        </label>
      </div>
    );
  }
}
