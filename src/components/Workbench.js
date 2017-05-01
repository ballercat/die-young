const React = require('react');
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  MainContainer,
  ControlsContainer,
  AppBarContainer
} from './containers';
import store from './store';

class Workbench extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <MuiThemeProvider>
          <div>
            <ControlsContainer />
            <AppBarContainer />
            <MainContainer />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
module.exports = Workbench;
