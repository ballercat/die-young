import Victor from 'victor';
import { is, isNil } from 'ramda';
import { checkCircleCollision } from './collision';

const isVictor = is(Victor);

export default class Circle {
  constructor(options) {
    Object.assign(this, options || {});

    if (!isVictor(this.center)) {
      this.center = new Victor(0, 0);
    }

    if (isNil(this.radius)) {
      this.radius = 0;
    }
  }

  collides(other) {
    if (!isCircle(other)) return false;
    return checkCircleCollision(this, other);
  }
}

export const isCircle = is(Circle);

