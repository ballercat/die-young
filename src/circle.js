import Victor from 'victor';
import { is, isNil } from 'ramda';

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

    // .subtract is destructive
    const distance = this.center.clone().subtract(other.center);
    const radius = this.radius + other.radius;

    return distance.length() < radius;
  }
}

export const isCircle = is(Circle);

