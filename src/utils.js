import { POLYGON } from './bodyTypes';

export const randomPolygon = (
  r = 100.0,
  minSides = 3,
  maxSides = 10,
  width = 800,
  height = 600
) => {
  const y0 = r;
  const x0 = r;
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
    x: width/2 - 200 + (Math.random() * 200) | 0,
    y: height/2 - 200 + (Math.random() * 200) | 0,
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

