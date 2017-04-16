import { Container, Graphics, basicRenderer } from './renderer';
import Input, { SPACEBAR } from './input';
import Shape from './shape';
import Body from './body';
import World, { FIXED_TIMESTEP } from './world';
import Polygon from './polygon';
import { randomPolygon } from './utils';
import { polygonPolygon } from './collision';

const GRAVITY = [0, -50];
const renderer = basicRenderer(document.getElementById('app'));
const stage = new Container();
stage.setTransform(400, 300);
stage.scale.y = -1;

const world = new World();

let lastUpdate = Date.now();
const render = () => {
  // renderer.clear();
  renderer.render(stage);
  requestAnimationFrame(render);
  const now = Date.now();
  if (now - lastUpdate >= FIXED_TIMESTEP) {
    lastUpdate = now;
    world.step();
  }
};
render();

const LINE_COLLISION = [2, 0xFF3300];
const LINE = [2, 0x003300];

const ground = new Body({
  body: new Polygon([
    -300, -290,
    -300, -300,
    300, -300,
    300, -290
  ])
});
ground.attachShape(new Shape(Graphics, { fill: [0, 0], lineStyle: LINE }));

stage.addChild(ground.shape.graphics);
ground.render();

const object = new Body({
  body: new Polygon([])
});
object.attachShape(new Shape(Graphics, { fill: [0, 0], lineStyle: LINE }));

stage.addChild(object.shape.graphics);

world.add(ground, object);

// Keyboard
const inputHandler = new Input();
inputHandler.onKeydown((e) => {
  if (e.which === SPACEBAR) {
    object.position = [0, 300];
    object.state.mass = 2;
    object.body = new Polygon(randomPolygon().units);
    object.state.forces = [GRAVITY];
  }
});

