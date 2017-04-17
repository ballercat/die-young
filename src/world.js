import { compose, curry, not, isNil } from 'ramda';
import collision from './collision';
import { consoleTap } from './utils';
import { add } from 'numericjs';

/**
 * World contains physics bodies and is what
 * we use to run the simulation.
 */

// TODO: this needs to be at least 1/2 of 60fps
export const FIXED_TIMESTEP = 1 / 60.0;
const GRID_BOUNDARY = 1000;
export const CELL_SIZE = 100;
const ROW_COUNT = (GRID_BOUNDARY / CELL_SIZE);
const COLUMN_COUNT = ROW_COUNT;
// Positive offset to use when indexing onto the flat grid array
const GRID_OFFSET = GRID_BOUNDARY / 2;
// TODO: If anything ever falls of the grid we will need to make more than one of these
export const GRID_SIZE = (ROW_COUNT) * (COLUMN_COUNT);

const notNil = compose(not, isNil);

export const makeGrid = () => {
  const grid = new Array(GRID_SIZE);
  for (let i = 0; i < ROW_COUNT; i++) {
    const X = i * CELL_SIZE - GRID_OFFSET;
    for (let j = 0; j < COLUMN_COUNT; j++) {
      const Y = j * CELL_SIZE - GRID_OFFSET;
      grid[i * ROW_COUNT + j] = {
        X,
        Y,
        bodies: []
      };
    }
  }
  return grid;
};

export const toMinMax = val => {
  const mutate = val < 0 ? Math.ceil : Math.floor;
  return mutate(Math.abs(val) / CELL_SIZE) * Math.sign(val);
};

export const getBodyGridBounds = body => {
  const bounds = body.aabb.bounds.map(minmax => add(minmax, body.position));
  return {
    bodyMinX: toMinMax(bounds[0][0]),
    bodyMinY: toMinMax(bounds[0][1]),
    bodyMaxX: toMinMax(bounds[1][0]),
    bodyMaxY: toMinMax(bounds[1][1])
  };
};

export const getGridLocation = (j, i) => {

};

export const intoGrid = curry((grid, body) => {
  const {
    bodyMinX, bodyMinY,
    bodyMaxY, bodyMaxX } = getBodyGridBounds(body);

  let i = bodyMinX;
  let j;

  do {
    const X = (i) * CELL_SIZE;
    const offsetX = GRID_OFFSET + X;

    j = bodyMinY;

    do {
      const Y = j * CELL_SIZE;
      const offsetY = GRID_OFFSET + Y;
      const location = Math.floor((offsetX * ROW_COUNT + offsetY) / CELL_SIZE);

      if (!grid[location].bodies.includes(body)) {
        grid[location].bodies.push(body);
      }

      j++;
    } while (j <= bodyMaxY);

    i++;
  } while (i <= bodyMaxX);
});

export default class World {
  constructor() {
    this.bodies = [];
    this.grid = [];
    this._gridStorage = makeGrid();
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
    this.bodies.forEach(body => body.update(FIXED_TIMESTEP));
    this.detectCollisions();
  }

  detectCollisions() {
    const grid = this.getCollisionGrid(this.bodies);
    this.resolveCollisions(this.getCollisionPairs(grid));
    this.grid = grid;
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
    for(let i = 0; i < GRID_SIZE; i++) {
      this._gridStorage[i].bodies = [];
    };
    const placeIntoGrid = intoGrid(this._gridStorage);
    bodies.forEach(placeIntoGrid);

    return this._gridStorage.filter(notNil);
  }
}

