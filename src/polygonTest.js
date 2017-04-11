import { Container, Graphics, basicRenderer } from './renderer';
import Input, { SPACEBAR } from './input';
import Shape from './shape';
import Polygon from './polygon';
import Body from './body';
import GridShape from './gridShape';
import { randomPolygon } from './utils';
import { polygonPolygon } from './collision';
import World from './world';

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
const GRID_LINE = [1, 0x3f3f3f];

const world = new World();
const gridShape = new GridShape(Graphics, { lineStyle: GRID_LINE });

const polyBody1 = new Body({
  body: new Polygon([])
});
polyBody1.attachShape(new Shape(Graphics, { fill: [0xffffff, 1], lineStyle: LINE }));

const polyBody2 = new Body({
  body: new Polygon([])
});
polyBody2.attachShape(new Shape(Graphics, { fill: [0xffffff, 1], lineStyle: LINE }));

stage.addChild(polyBody1.shape.graphics);
stage.addChild(polyBody2.shape.graphics);
stage.addChild(gridShape.graphics);

// Keyboard
const inputHandler = new Input();
inputHandler.onKeydown((e) => {
  if (e.which === SPACEBAR) {
    // Crate and collision test two polygons
    polyBody1.body = new Polygon(randomPolygon().units);
    polyBody2.body = new Polygon(randomPolygon().units);
    world.add(polyBody1, polyBody2);

    const grid = world.getCollisionGrid(world.bodies);
    gridShape.render(grid);
    world.resolveCollisions(world.getCollisionPairs(grid));

    world.bodies = [];

    polyBody1.render();
    polyBody2.render();
  }
});

console.log('Polygon tester. Generate random polygon with SPACEBAR');

