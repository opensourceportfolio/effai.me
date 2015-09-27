import React from 'lib/react';

export class Percent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let node = React.findDOMNode(this.refs.percent);

    window.componentHandler.upgradeElement(node);
  }

  handleChange(event) {
    let value = parseFloat(event.target.value);

    value = !value ? 0 : value;
    this.props.onChange(this.props.name, value);
  }

  render() {
    let name = this.props.name;

    return (
      <div>
        <label className="mdl-label" htmlFor={name}>
          {this.props.placeholder} ({this.props.value}%)
        </label>
        <div className="mdl-grid">
          <div className="mdl-cell--12-col">
            <input className="mdl-slider mdl-js-slider"
              defaultValue={this.props.value}
              min={this.props.meta.min}
              max={this.props.meta.max}
              onChange={this.handleChange.bind(this)}
              ref="percent"
              required
              step={this.props.meta.step}
              type="range" />
          </div>
        </div>
      </div>
    );
  }
}
