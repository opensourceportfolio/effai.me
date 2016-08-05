import React from 'lib/react';
import componentHandler from 'lib/mdl';
import 'lib/mdl/dist/material.red-amber.min.css';

export default class Percent extends React.Component {

  componentDidMount() {
    const node = this.refs.percent;

    componentHandler.upgradeElement(node);
  }

  handleChange(event) {
    const value = parseFloat(event.target.value) || 0;

    this.props.onChange(this.props.name, value);
  }

  render() {
    const value = this.props.value ? this.props.value : '';
    const name = this.props.name;

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
