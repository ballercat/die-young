import React from 'react';
import Paper from 'material-ui/Paper';
import { WorkspaceContainer } from './containers';
import { omit } from 'ramda';

const cleanProps = omit(['renderer', 'cards', 'dispatch']);
const style = {
  minHeight: '100vw',
  margin: '10px',
  padding: '10px'
};

class Main extends React.Component {
  render() {
    const props = { ...cleanProps(this.props), style };
    const { cards, renderer } = this.props;
    return (
      <Paper {...props} >
        {cards.map(ws => <WorkspaceContainer key={ws.id} {...ws} renderer={renderer} />)}
      </Paper>
    )
  }
}

export default Main;

