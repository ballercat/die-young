import { compose, curry, not, isNil } from 'ramda';
import collision from './collision';

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

const notNil = compose(not, isNil);

export const makeGrid = () => {
  return new Array(GRID_SIZE);
};

export const getBodyGridBounds = body => {
  const bounds = body.aabb.bounds;
  const bodyMinX = Math.round(bounds[0][0] / CELL_SIZE);
  const bodyMinY = Math.round(bounds[0][1] / CELL_SIZE);
  const bodyMaxX = Math.round(bounds[1][0] / CELL_SIZE);
  const bodyMaxY = Math.round(bounds[1][1] / CELL_SIZE);

  return {
    bodyMinX, bodyMinY,
    bodyMaxX, bodyMaxY
  };
};

export const intoGrid = curry((grid, body) => {
  const {
    bodyMinX, bodyMinY,
    bodyMaxY, bodyMaxX } = getBodyGridBounds(body);

  const cellCountX = (bodyMaxX - bodyMinX) || 0;
  const cellCountY = (bodyMaxY - bodyMinY) || 0;

  let i = 0;
  let j = 0;

  for(i = 0; i < cellCountX; i++) {
    const X = ((bodyMinX + i) * CELL_SIZE);
    const offsetX = GRID_OFFSET + X;

    for(j = 0; j < cellCountY; j++) {
      const Y = ((bodyMinY + j) * CELL_SIZE);
      const offsetY = GRID_OFFSET + Y;
      const location = Math.floor((offsetX * ROW_COUNT + offsetY) / CELL_SIZE);
      if (!grid[location])
        grid[location] = {
          X,
          Y,
          CELL_SIZE,
          bodies: []
        };

      if (!grid[location].bodies.includes(body)) {
        grid[location].bodies.push(body);
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

  resolveCollisions(pairs) {
    const resolved = {};

    pairs.forEach(pair => {
      const a = pair[0];
      const b = pair[1];

      if (!resolved[a._uuid])
        resolved[a._uuid] = [];
      else if(resolved[a._uuid].includes(b._uuid))
        return;

      if (!resolved[b._uuid])
        resolved[b._uuid] = [];
      else if(resolved[b._uuid].includes(b._uuid))
        return;

      resolved[a._uuid].push(b._uuid);
      resolved[b._uuid].push(a._uuid);

      if (collision(a.body, b.body)) {
        a.onCollision(b);
        b.onCollision(a);
      }
    });
  }

  /**
   * Returns collision pairs
   */
  getCollisionPairs(grid) {
    // first filter out any grid cell with one or more bodies
    const pairArray = grid
      .filter(cell => cell.bodies.length > 1)
      .map(cell => {
        const length = cell.bodies.length;
        if (length === 2)
          return cell.bodies;

        const pairs = [];
        let i, j;
        for (i = 0; i < length; i++) {
          for (j = i + 1; j < length; j++) {
            pairs.push[[cell.bodies[i], cell.bodies[j]]];
          }
        }

        return pairs;
      });
    return pairArray;
  }

  getCollisionGrid(bodies) {
    const grid = makeGrid();
    const placeIntoGrid = intoGrid(grid);
    bodies.forEach(placeIntoGrid);

    return grid.filter(notNil);
  }
}

