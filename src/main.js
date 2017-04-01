import pixi from './renderer';
import input, { UP, DOWN, LEFT, RIGHT } from './input';

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
rectangle.x = rectangle.y = 0;

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
const onUp = input(UP)(() => console.log(rectangle.y--));
const onDown = input(DOWN)(() => console.log(rectangle.y++));
const onLeft = input(LEFT)(() => rectange.x++);
const onRight = input(RIGHT)(() => rectange.x--);

console.log(UP, DOWN, LEFT, RIGHT);

window.addEventListener('keydown', onUp);
window.addEventListener('keydown', (e) => {
  console.log(e);
  onDown(e);
});
