import Victor from 'victor';
import { has, curry } from 'ramda';

export const checkCircleCollision = curry((a, b) => {
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
});

const MIN = 0;
const MAX = 1;
const range = (normal, vertices) => {
  const r = [Number.MAX_VALUE, Number.MIN_VALUE];
  let dot = 0;
  const length = vertices.length;
  for(let i =0; i < length; i++) {
    dot = vertices[i].dot(normal);
    if (dot > r[MAX])
      r[MAX] = dot;
    if (dot < r[MIN])
      r[MIN] = dot;
  }
  return r;
};

export const polygonPolygon = curry((a, b) => {
  const normals = [...a.normals, ...b.normals];
  return !(normals.find(normal => {
    const ra = range(normal, a.vertices);
    const rb = range(normal, b.vertices);
    return (ra[MIN] > rb[MAX] || rb[MIN] > ra[MAX]);
  }));
});

const collision = (a, b) => {
  if (!a || !b) return false;
  if (a.radius || b.radius) return checkCircleCollision(a, b);
  return polygonPolygon(a, b);
};

export const isCollision = obj => has('N', obj) && has('P', obj);
export default collision;

