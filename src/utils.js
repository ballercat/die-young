import { POLYGON } from './bodyTypes';

export const randomPolygon = (
  r = 50.0,
  minSides = 4,
  width = 800,
  height = 600
) => {
  const y0 = r;
  const x0 = r;
  const vertexCount = minSides + ((Math.random() * 7) | 0);
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

