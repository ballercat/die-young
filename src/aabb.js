import { isVector } from './utils';
import { is } from 'ramda';

/**
 * Axis Aligned Bounding Box
 */
export default class AABB {
  constructor(options) {
    Object.assign(this, options || {});

    if (!isVector(this.center)) {
      this.center = [0, 0];
    }

    if (!isVector(this.halfSize)) {
      this.halfSize = [0, 0];
    }
  }

  collides(other) {
    if (!isAABB(other)) return false;

    if (Math.abs(this.center[0] - other.center[0]) > this.halfSize[0] + other.halfSize[0]) return false;
    if (Math.abs(this.center[1] - other.center[1]) > this.halfSize[1] + other.halfSize[1]) return false;

    return true;
  }
}

export const isAABB = is(AABB);

