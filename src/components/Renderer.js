const React = require('react');
const PropTypes = require('prop-types');

class Renderer extends React.Component {
  static propTypes = {
    bootstrap: PropTypes.func.isRequired
  }

  componentWillRecieveProps(nextProps) {
    const { width: nextWidth, height: nextHeight } = nextProps;
    const { width, height } = this.props;

    if (this.renderer && (nexWidth !== width || nextHeight !== height)) {
      this.renderer.resize(nextWidth, nextHeight);
    }
  }

  componentWillUnmount() {
    const { renderer } = this.state;
    if (renderer)
      renderer.destroy();
  }

  componentDidMount() {
    const { bootstrap } = this.props;
    this.renderer = bootstrap(this.root);
  }

  render() {
    return (
      <div className="" ref={(node) => this.root = node} />
    );
  }
}

module.exports = Renderer;

