const React = require('react');
const PropTypes = require('prop-types');
const Renderer = require('./Renderer');
const Controls = require('./Controls');

class Workbench extends React.Component {
  static propTypes = {
    controls: PropTypes.object,
    renderer: PropTypes.shape(Renderer.propTypes)
  }

  static defaultProps = {
    controls: {}
  }

  render() {
    const { controls, renderer } = this.props;
    return (
      <div className="Workbench">
        <Renderer {...renderer} />
        <Controls {...controls} />
      </div>
    );
  }
}
module.exports = Workbench;
