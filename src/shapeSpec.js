import Shape from './shape';
import { POINT, LINE, CIRCLE, POLYGON } from './bodyTypes';

// Mock
class Graphics {
  clear() {}
  beginFill() {}
  endFill() {}
  lineStyle() {}
  drawPolygon() {}
}

const body = { type: POLYGON, units: [] };
describe('Shape', () => {
  it('requires a DI of Graphics', () => {
    expect(() => new Shape()).toThrow('Graphics missing for Shape');
    expect(() => new Shape(Graphics)).not.toThrow();
  });

  it('renders bodies', () => {
    const shape = new Shape(Graphics);
    spyOn(shape.graphics, 'drawPolygon');
    shape.render(body);
    expect(shape.graphics.drawPolygon).toHaveBeenCalledWith(jasmine.any(Array));
  });
});

