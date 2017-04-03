import { Container, Graphics, basicRenderer } from './renderer';
import Input, { SPACEBAR } from './input';
import Shape from './shape';
import Polygon from './polygon';
import { randomPolygon } from './utils';

const renderer = basicRenderer(document.getElementById('app'));
const stage = new Container();

const render = () => {
  renderer.clear();
  renderer.render(stage);
  requestAnimationFrame(render);
};
render();

const polyShape = new Shape(Graphics, { lineStyle: [1, 0xFF3300, 1] }, true);
stage.addChild(polyShape.graphics);



// Keyboard
const inputHandler = new Input();

inputHandler.onKeydown((e) => {
  if (e.which === SPACEBAR) {
    const def = randomPolygon();
    const poly = new Polygon(def.units, def.x, def.y);
    polyShape.render(poly);
  }
});

console.log('Polygon tester. Generate random polygon with SPACEBAR');

