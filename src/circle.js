import { is, isNil } from 'ramda';
import { checkCircleCollision } from './collision';
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
  }
}

export const isCircle = is(Circle);

