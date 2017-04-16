import { POLYGON } from './bodyTypes';
import { tap, is } from 'ramda';

export const randomPolygon = (
  r = 100.0,
  minSides = 4,
  maxSides = 10,
  width = 800,
  height = 600
) => {
  const y0 = 0;
  const x0 = 0;
  const vertexCount = minSides + ((Math.random() * (maxSides - minSides)) | 0);
  const units = [];
  const angle = [];
  for (let i = 0; i < vertexCount; i++) {
    angle.push(Math.random() * (2*Math.PI));
  }
  angle.sort();
  for (let i = 0; i < vertexCount; i++) {
    const x = x0 + r * Math.cos(angle[i]);
    const y = y0 + r * Math.sin(angle[i]);
    units.push(x, y);
  }

  return {
    x: 0,
    y: 0,
    type: POLYGON,
    units
  };
}

export const project = (v, b) => {
  const ret = v.clone();
  const amt = ret.dot(b) / b.length();
  ret.x = amt * b.x;
  ret.y = amt * b.y;
  return ret;
};

export const consoleTap = tap(console.log);

export const isVector = v => v && is(Array) && v.length === 2;

