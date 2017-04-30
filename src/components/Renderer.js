const React = require('react');
const PropTypes = require('prop-types');

class Renderer extends React.Component {
  static propTypes = {
    bootstrap: PropTypes.func.isRequired
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

