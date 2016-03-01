import React from 'lib/react';
import { componentHandler } from 'lib/mdl';

export default class Percent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let node = this.refs.percent;

    componentHandler.upgradeElement(node);
  }

  handleChange(event) {
    let value = parseFloat(event.target.value);

    value = !value ? 0 : value;
    this.props.onChange(this.props.name, value);
  }

  render() {
    let value = this.props.value ? this.props.value : '';
    let name = this.props.name;

    return (
      <div>
        <label className="mdl-label" htmlFor={name}>
          {this.props.text.placeholder} ({this.props.value}%)
        </label>
        <div className="mdl-grid">
          <div className="mdl-cell--12-col">
            <input className="mdl-slider mdl-js-slider"
              defaultValue={value}
              min={this.props.rangeInfo.min}
              max={this.props.rangeInfo.max}
              onChange={this.handleChange.bind(this)}
              ref="percent"
              required
              step={this.props.rangeInfo.step}
              type="range" />
          </div>
        </div>
      </div>
    );
  }
}
