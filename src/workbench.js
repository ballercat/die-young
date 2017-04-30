const Workbench = require('./components/Workbench');
const React = require('react');
const { render } = require('react-dom');

const root = document.getElementById("app");

render(
  <Workbench />,
  root
);

