import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class WorkbenchControls extends React.Component {
  render() {
    return(
      <Drawer {...this.props} >
        <MenuItem>New Workspace</MenuItem>
      </Drawer>
    );
  }
}

module.exports = WorkbenchControls;

