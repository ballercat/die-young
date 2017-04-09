import { is, isNil } from 'ramda';
import { checkCircleCollision } from './collision';
import AABB from './aabb';
import { isVector } from './utils';

export default class Circle {
  constructor(options) {
    Object.assign(this, options || {});

    if (!isVector(this.center)) {
      this.center = [0, 0];
    }

    if (isNil(this.radius)) {
      this.radius = 0;
    }

    this.collision = checkCircleCollision(this);
    this.aabb = this.getAABB();
  }

  getAABB() {
    return new AABB({
      center: [0, 0],
      halfSize: [this.radius, this.radius]
    });
  }
}

export const isCircle = is(Circle);

