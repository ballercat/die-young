import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { omit, compose } from 'ramda';

const cleanProps = omit(['newWorkspace']);

class WorkbenchControls extends React.Component {
  render() {
    const { newWorkspace, onRequestChange } = this.props;

    return(
      <Drawer {...cleanProps(this.props)} >
        <MenuItem onTouchTap={compose(newWorkspace, onRequestChange)} >New Workspace</MenuItem>
      </Drawer>
    );
  }
}

module.exports = WorkbenchControls;

