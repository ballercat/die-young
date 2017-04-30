const React = require('react');
const PropTypes = require('prop-types');
const { noop } = require('ramda');

const Checkbox = ({ id, onChange, label }) => (
  <label className="" htmlFor={id} >
    <input type="checkbox" id={id} onChange={onChange} />
    <span>{label}</span>
  </label>
);
Checkbox.defaultProps = { onChange: noop };

class WorkbenchControls extends React.Component {
  render() {
    return(
      <div className="Workbench-Controls">
        <Checkbox id="boundingbox" label="Enable Bounding Box" />
      </div>
    );
  }
}

module.exports = WorkbenchControls;

