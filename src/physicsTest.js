import { Container, Graphics, basicRenderer } from './renderer';
import Input, { SPACEBAR } from './input';
import Shape from './shape';
import Polygon from './polygon';
import { randomPolygon } from './utils';
import { polygonPolygon } from './collision';

const renderer = basicRenderer(document.getElementById('app'));
const stage = new Container();
stage.setTransform(400, 300);

const render = () => {
  // renderer.clear();
  renderer.render(stage);
  requestAnimationFrame(render);
};
render();

const LINE_COLLISION = [2, 0xFF3300];
const LINE = [2, 0x003300];

// Keyboard
const inputHandler = new Input();
