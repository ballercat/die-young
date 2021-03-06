import { has, curry } from 'ramda';
import { dot, mul, div, sub, norm2 } from 'numericjs';

/**
 * Circle to circle collision detection
 *
 * @param {Circle} a
 * @param {Circle} b
 *
 * @return bool Collision detected
 */
export const checkCircleCollision = curry((a, b) => {
  const distance = sub(a.center, b.center);
  const radius = a.radius + b.radius;
  const length = norm2(distance);

  if (length < radius) {
    const L = [length, length];
    const N = div(distance, L);
    const P = mul(N, L);
    return { N, P };
  }

  return false;
});

const MIN = 0;
const MAX = 1;
const range = (normal, vertices) => {
  const r = [Number.MAX_VALUE, Number.MIN_VALUE];
  let _dot = 0;
  const length = vertices.length;
  for(let i =0; i < length; i++) {
    _dot = dot(vertices[i], normal);
    if (_dot > r[MAX])
      r[MAX] = _dot;
    if (_dot < r[MIN])
      r[MIN] = _dot;
  }
  return r;
};

/**
 * Check polygon to polygon collision
 *
 * @param {Polygon} a
 * @param {Polygon} b
 *
 * @return false|{Object} collision manifold if collision detected
 */
export const polygonPolygon = curry((a, b) => {
  const normals = [...a.normals, ...b.normals];
  const manifold = {
    overlap: Number.MAX_VALUE,
    normal: null
  };
  const collides = !normals.find(normal => {
    const ra = range(normal, a.vertices);
    const rb = range(normal, b.vertices);
    const overlap = Math.max(0, Math.min(ra[MAX], rb[MAX]) - Math.max(ra[MIN], rb[MIN]));

    if (overlap < manifold.overlap) {
      manifold.overlap = overlap;
      manifold.normal = normal;
    }

    return !overlap;
  });

  return collides ? manifold : false;
});

const collision = (a, b) => {
  if (!a || !b) return false;
  if (a.radius || b.radius) return checkCircleCollision(a, b);
  return polygonPolygon(a, b);
};

export const isCollision = obj => has('N', obj) && has('P', obj);
export default collision;

