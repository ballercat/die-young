import Shape from './shape';

export default class GridShape extends Shape {

  constructor(Graphics, renderOptions = {
    fill: [0x333333, 1]
  }) {
    super(Graphics, renderOptions);
  }

  render(grid) {
    this.beginRender();
    grid.forEach(cell => {
      this.graphics.drawRect(cell.X, cell.Y, cell.CELL_SIZE, cell.CELL_SIZE);
    });
    this.endRender();
  }
}

