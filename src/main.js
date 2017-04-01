import pixi from './renderer';
const { autoDetectRenderer, Container } = pixi;

const appRoot = document.getElementById('app');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const CANVAS_OPTIONS = {
  antialias: false,
  transparent: true,
  resolution: 1
};

const renderer = autoDetectRenderer(
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_OPTIONS
);
renderer.view.style.border = '1px dashed black';

appRoot.appendChild(renderer.view);

const stage = new Container();

renderer.render(stage);


