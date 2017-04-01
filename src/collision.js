import Victor from 'victor';
import { has } from 'ramda';

const checkCircleCollision = (a, b) => {
  const distance = a.center.clone().subtract(b.center);
  const radius = a.radius + b.radius;
  const length = distance.length();

  if (length < radius) {
    const L = new Victor(length, length);
    const N = distance.divide(L);
    const P = N.multiply(L);
    return { N, P };
  }

  return false;
};

const checkPolygonCollision = (a, b) => {
  return false;
}

const collision = (a, b) => {
  if (!a || !b) return false;
  if (a.radius || b.radius) return checkCircleCollision(a, b);
  return checkPolygonCollision(a, b);
};

export const isCollision = obj => has('N', obj) && has('P', obj);
export default collision;
