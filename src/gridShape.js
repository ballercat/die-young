import Shape from './shape';
import { CELL_SIZE } from './world';

const drawRectArguments = [0, 0, CELL_SIZE, CELL_SIZE];

const NORMAL = [1, 0];
const NONEMPTY = [0, 0x0000FF];
const FILLNONEMPTY = [0x0033AA, 0.3];

export default class GridShape extends Shape {

  constructor(Graphics, renderOptions = {
    fill: [0x333333, 1]
  }) {
    super(Graphics, renderOptions);
  }

  render(grid) {
    this.beginRender();
    grid.forEach(cell => {
      drawRectArguments[0] = cell.X;
      drawRectArguments[1] = cell.Y;
      this.graphics.lineStyle(...NORMAL);
      if (cell.bodies.length) {
        this.graphics.lineStyle(...NONEMPTY);
        this.graphics.beginFill(...FILLNONEMPTY);
      }
      this.graphics.drawRect(...drawRectArguments);
      if (cell.bodies.length)
        this.graphics.endFill();
    });
    this.endRender();
  }
}

