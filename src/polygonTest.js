import { Container, Graphics, basicRenderer } from './renderer';
import Input, { SPACEBAR } from './input';
import Shape from './shape';
import { randomPolygon } from './utils';

const renderer = basicRenderer(document.getElementById('app'));
const stage = new Container();

const render = () => {
  renderer.clear();
  renderer.render(stage);
  requestAnimationFrame(render);
};
render();

const polyShape = new Shape(Graphics, { lineStyle: [1, 0xFF3300, 1] });
stage.addChild(polyShape.graphics);

// Keyboard
const inputHandler = new Input();

inputHandler.onKeydown((e) => {
  if (e.which === SPACEBAR) {
    polyShape.render(randomPolygon());
  }
});

console.log('Polygon tester. Generate random polygon with SPACEBAR');

