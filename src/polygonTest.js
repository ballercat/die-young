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

const polyShape = new Shape(Graphics, { lineStyle: LINE });
const polyShape2 = new Shape(Graphics, { lineStyle: LINE });

stage.addChild(polyShape.graphics);
stage.addChild(polyShape2.graphics);


// Keyboard
const inputHandler = new Input();
inputHandler.onKeydown((e) => {
  if (e.which === SPACEBAR) {
    // Crate and collision test two polygons
    const poly = new Polygon(randomPolygon().units);
    const poly2 = new Polygon(randomPolygon().units);
    const collision = polygonPolygon(poly, poly2)
    if (collision) {
      console.log('Collision Manifold: ', collision);
      polyShape.lineStyle = LINE_COLLISION;
      polyShape2.lineStyle = LINE_COLLISION;
    } else {
      polyShape.lineStyle = LINE;
      polyShape2.lineStyle = LINE;
    }

    polyShape2.render(poly2);
    polyShape.render(poly);
  }
});

console.log('Polygon tester. Generate random polygon with SPACEBAR');

