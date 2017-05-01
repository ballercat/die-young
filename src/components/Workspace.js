import React from 'react';
import { Card, CardHeader, CardActions, CardMedia, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';
import Slider from 'material-ui/Slider';
import { noop } from 'ramda';

const style = {
  height: '50vw',
  margin: '20px',
  padding: '20px'
}

class Workspace extends React.Component {
  static defaultProps = {
    remove: noop
  }

  state = {
    width: 400,
    height: 300
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    const { renderer } = this.state;
    if (renderer)
      renderer.destroy();
  }

  create = () => {
    if (this.state.renderer) {
      this.state.renderer.destroy();
    }

    const { width, height } = this.state;
    this.setState({
      renderer: this.props.renderer.bootstrap(this.renderRoot, { width, height })
    });
  }

  render() {
    const { title = 'New Workspace', remove, id } = this.props;
    return (
      <Card style={style} >
        <CardHeader
          title={title}
        />
        <CardMedia>
          <div ref={(node) => this.renderRoot = node}></div>
        </CardMedia>
        <CardText>
          <Slider
            max={1600}
            min={400}
            step={5}
            onChange={(e, width) => this.setState({ width })}
          />
          <span>{`Width: ${this.state.width}`}</span>
          <Slider
            max={1200}
            min={300}
            step={5}
            onChange={(e, height) => this.setState({ height })}
          />
          <span>{`Width: ${this.state.height}`}</span>
        </CardText>
        <CardActions>
          <RaisedButton label="Remove" onTouchTap={() => remove(id)} />
          <RaisedButton label="Create" onTouchTap={this.create} />
        </CardActions>
      </Card>
    );
  }
}

export default Workspace;

