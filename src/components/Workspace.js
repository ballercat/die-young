import React from 'react';
import { Card, CardHeader, CardActions, CardMedia } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionBuild from 'material-ui/svg-icons/action/build';
import { noop } from 'ramda';

const style = {
  height: '50vw',
  margin: '20px'
}

class Workspace extends React.Component {
  static defaultProps = {
    remove: noop
  }

  render() {
    const { title = 'New Workspace', remove, id } = this.props;
    return (
      <Card style={style} >
        <CardHeader
          title={title}
        />
        <CardActions>
          <RaisedButton label="Remove" onTouchTap={() => remove(id)} />
        </CardActions>
      </Card>
    );
  }
}

export default Workspace;

