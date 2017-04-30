const Workbench = require('./components/Workbench');
const React = require('react');
const { render } = require('react-dom');
const { basicRenderer: bootstrap } = require('./renderer');

const root = document.getElementById("app");
const defaultProps = {
  renderer: { bootstrap }
};

render(
  <Workbench {...defaultProps} />,
  root
);

