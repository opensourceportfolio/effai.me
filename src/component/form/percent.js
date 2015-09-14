import React from 'lib/react';
import meta from 'service/meta';

export class Percent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var node = React.findDOMNode(this.refs.percent);
    componentHandler.upgradeElement(node);
  }

  handleChange(event) {
    var value = parseFloat(event.target.value);
    value = !value ? 0 : value;
    this.props.onChange(this.props.name, value);
  }

  render() {
    var name = this.props.name;
    var metadata = meta[name];

    return (
      <div>
        <label className="mdl-label" htmlFor={name}>
          {this.props.placeholder} ({this.props.value}%)
        </label>
        <div className="mdl-grid">
          <div className="mdl-cell--1-col">
            <i className="icon-percent"></i>
          </div>
          <div className="mdl-cell--11-col">
            <input className="mdl-slider mdl-js-slider"
              defaultValue={this.props.value}
              max={metadata.max}
              min={metadata.min}
              onChange={this.handleChange.bind(this)}
              ref="percent"
              required
              step={metadata.step}
              type="range" />
          </div>
        </div>
      </div>
    );
  }
}
