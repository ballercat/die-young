import {
  toggleControls,
  newWorkspace,
  removeWorkspace
} from './actions';
import { getMain, getControls, getAppBar } from './selectors';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Controls from './Controls';
import Main from './Main';
import Workspace from './Workspace';

export const ControlsContainer = connect(
  getControls,
  {
    onRequestChange: toggleControls,
    newWorkspace
  }
)(Controls);

export const AppBarContainer = connect(
  getAppBar,
  {
    onLeftIconButtonTouchTap: toggleControls
  }
)(AppBar);

export const MainContainer = connect(
  getMain
)(Main);

export const WorkspaceContainer = connect(
  null,
  { remove: removeWorkspace }
)(Workspace);

