import pixi from './renderer';
import Input, { UP, DOWN, LEFT, RIGHT } from './input';

const { autoDetectRenderer, Container, Graphics } = pixi;

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

const rectangle = new Graphics();
rectangle.beginFill(0x66CCFF);
rectangle.lineStyle(4, 0xFF3300, 1);
rectangle.drawRect(0, 0, 100, 100);
rectangle.endFill();
rectangle.x = 0;
rectangle.y = 500;

// Basics
renderer.view.style.border = '1px dashed black';
appRoot.appendChild(renderer.view);
const stage = new Container();

stage.addChild(rectangle);

const render = () => {
  renderer.render(stage);
  requestAnimationFrame(render);
};
render();

// Keyboard
const inputHanlder = new Input();

const MOVEBY = 10;
const moveList = {
	[UP]: () => rectangle.y = rectangle.y - MOVEBY,
	[DOWN]: () => rectangle.y = rectangle.y + MOVEBY,
	[LEFT]: () => rectangle.x = rectangle.x - MOVEBY,
	[RIGHT]: () => rectangle.x = rectangle.x + MOVEBY
};

inputHanlder.onKeydown(data => {
  const move = moveList[data.which];
  if (move) {
    move();
  }
});

