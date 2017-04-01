import Victor from 'victor';
import { is } from 'ramda';

const isVictor = is(Victor);

export default class AABB {
  constructor(options) {
    Object.assign(this, options || {});

    if (!isVictor(this.center)) {
      this.center = new Victor(0, 0);
    }

    if (!isVictor(this.halfSize)) {
      this.halfSize = new Victor(0, 0);
    }
  }

  collides(other) {
    if (!isAABB(other)) return false;

    if (Math.abs(this.center.x - other.center.x) > this.halfSize.x + other.halfSize.x) return false;
    if (Math.abs(this.center.y - other.center.y) > this.halfSize.y + other.halfSize.y) return false;

    return true;
  }
}

export const isAABB = is(AABB);

