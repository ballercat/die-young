import React from 'react';
import { Card, CardHeader, CardActions, CardMedia, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import ActionBuild from 'material-ui/svg-icons/action/build';
import RendererSetup from './RendererSetup';
import Renderer from './Renderer';
import { noop, when } from 'ramda';

const style = {
  minHeight: '50vw',
  margin: '20px',
  // padding: '20px'
};

const appBarStyle = {
  backgroundColor: 'inherit',
  color: 'black',
  fill: 'black'
};

class Workspace extends React.Component {
  static defaultProps = {
    remove: noop
  }

  state = {
    width: 400,
    height: 300
  }

  render() {
    const { title = 'New Workspace', renderer, remove, id } = this.props;
    const { width, height } = this.state;
    return (
      <Card style={style} onExpandChange={remove} >
        <CardHeader
          actAsExpander={true}
          title={<TextField id='workspace-title' defaultValue={title} onChange={() => {}} />}
          closeIcon={<NavigationClose />}
          openIcon={null}
          showExpandableButton={true}
        />
        <CardMedia>
          <Renderer {...renderer} />
        </CardMedia>
        <CardText>
          <RendererSetup />
        </CardText>
      </Card>
    );
  }
}

export default Workspace;

