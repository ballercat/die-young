const React = require('react');
const PropTypes = require('prop-types');
const Renderer = require('./Renderer');
import { toggleControls } from './actions';
import { getControls, getAppBar } from './selectors';
import { connect, Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Controls from './Controls';
import store from './store';

const ControlsContainer = connect(
  getControls,
  {
    onRequestChange: toggleControls
  }
)(Controls);

const AppBarContainer = connect(
  getAppBar,
  {
    onLeftIconButtonTouchTap: toggleControls
  }
)(AppBar);

class Workbench extends React.Component {
  static propTypes = {
    controls: PropTypes.object,
    renderer: PropTypes.shape(Renderer.propTypes)
  }

  static defaultProps = {
    controls: {
      docked: false,
      width: 500
    },
    container: {
      style: {
        height: '100vw',
        margin: '20px'
      }
    }
  }

  toggleDrawer = () => {
    const { open } = this.state.drawer;
    this.setState({
      drawer: {
        open: !open
      }
    });
  }

  render() {
    return (
      <Provider store={store} >
        <MuiThemeProvider>
          <div>
            <ControlsContainer />
            <AppBarContainer />
            <Paper />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
module.exports = Workbench;
