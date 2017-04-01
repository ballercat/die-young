import pixi from './renderer';
const { autoDetectRenderer, Container } = pixi;

const appRoot = document.getElementById('app');
const renderer = autoDetectRenderer(255, 255);

appRoot.appendChild(renderer.view);

const stage = new Container();
renderer.render(stage);


