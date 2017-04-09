import { curry } from 'ramda';

/**
 * World contains physics bodies and is what
 * we use to run the simulation.
 */

// TODO: this needs to be at least 1/2 of 60fps
const FIXED_TIMESTEP = 1 / 60.0;
const GRID_BOUNDARY = 1000;
const CELL_SIZE = 100;
const ROW_COUNT = (GRID_BOUNDARY / CELL_SIZE);
const COLUMN_COUNT = ROW_COUNT;
// Positive offset to use when indexing onto the flat grid array
const GRID_OFFSET = GRID_BOUNDARY / 2;
// TODO: If anything ever falls of the grid we will need to make more than one of these
const GRID_SIZE = (ROW_COUNT) * (COLUMN_COUNT);

export const makeGrid = () => {
  return new Array(GRID_SIZE);
};

export const intoGrid = curry((grid, body) => {
  const bounds = body.aabb.bounds;
  const bodyMinX = Math.floor(bounds[0][0] / CELL_SIZE);
  const bodyMaxX = Math.floor(bounds[1][0] / CELL_SIZE);
  const bodyMinY = Math.floor(bounds[0][1] / CELL_SIZE);
  const bodyMaxY = Math.floor(bounds[1][1] / CELL_SIZE);

  const cellCountX = (bodyMaxX - bodyMinX) || 0;
  const cellCountY = (bodyMaxY - bodyMinY) || 0;

  let i = 0;
  let j = 0;

  for(i = 0; i < cellCountX; i++) {
    const offsetX = GRID_OFFSET + bodyMinX + (i * CELL_SIZE);

    for(j = 0; j < cellCountY; j++) {
      const offsetY = GRID_OFFSET + bodyMinY + (j * CELL_SIZE);
      const location = Math.floor((offsetX * ROW_COUNT + offsetY) / CELL_SIZE);
      if (!grid[location])
        grid[location] = [];

      if (!grid[location].includes(body)) {
        grid[location].push(body);
      }
    }
  }
});

export default class World {
  constructor() {
    this.bodies = [];
  }

  static getTimeStep() {
    return FIXED_TIMESTEP;
  }

  add(...bodies) {
    return bodies.map(body => {
      if (!body)
        return body;

      if (body._uuid && this.bodies[body._uuid] != body._uuid) {
        this.bodies[body._uuid] = body;
      } else if(!body._uuid) {
        this.bodies.push(body);
        body._uuid = this.bodies.length;
      }

      return body;
    });
  }

  /**
   * Simulate the world by the predefined step
   */
  step() {
  }

  /**
   * Returns collision pairs
   */
  getCollisionPairs(bodies) {
  }

  getCollisionGrid(bodies) {
    const grid = makeGrid();
    const placeIntoGrid = intoGrid(grid);
    bodies.forEach(placeIntoGrid);

    return grid;
  }
}

