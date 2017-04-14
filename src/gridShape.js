import Shape from './shape';
import { CELL_SIZE } from './world';

const drawRectArguments = [0, 0, CELL_SIZE, CELL_SIZE];

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
      this.graphics.drawRect(...drawRectArguments);
    });
    this.endRender();
  }
}

