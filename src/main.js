import { Container, basicRenderer } from './renderer';
import Input, { UP, DOWN, LEFT, RIGHT } from './input';
import polygonGraphic from './polygonGraphic';
import Polygon from './polygon';
import Victor from 'victor';

window.Victor = Victor;

const renderer = basicRenderer(document.getElementById('app'));
// pentagon
const units = [
  0, 0.75,
  0.25, 0,
  0.75, 0,
  1, 0.75,
  0.5, 1
];
const fill = 0xFFFFFF;
const lineStyle = [1, 0xFF3300, 1];
const poly = polygonGraphic(new Polygon(units.map(unit => unit * 100)), { fill, lineStyle })
poly.scale = {x: -1, y: -1};
poly.x = 100;
poly.y = 500;

const stage = new Container();
stage.addChild(poly);

const render = () => {
  renderer.render(stage);
  requestAnimationFrame(render);
};
render();

// Keyboard
const inputHanlder = new Input();

const MOVEBY = 10;
const moveList = {
	[UP]: () => poly.y = poly.y - MOVEBY,
	[DOWN]: () => poly.y = poly.y + MOVEBY,
	[LEFT]: () => poly.x = poly.x - MOVEBY,
	[RIGHT]: () => poly.x = poly.x + MOVEBY
};

inputHanlder.onKeydown(data => {
  const move = moveList[data.which];
  if (move) {
    move();
  }
});

