import Victor from 'victor';
import { POLYGON } from './bodyTypes';

export default class Polygon {
  constructor(units, x = 0, y = 0) {
    if (units.length % 2 > 0)
      throw 'unit array must be a power of two, containing x, y coordinates';

    this.type = POLYGON;
    this.units = [...units];
    this.vertices = Polygon.unitsToVecotrs(this.units);
    this.edges = Polygon.getEdges(this.vertices);
    this.normals = Polygon.getNormals(this.edges);

    this.position = new Victor(x, y);
  }

  set x(x) {
    this.position.x = x;
  }

  set y(y) {
    this.position.y = y;
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  static unitsToVecotrs(units) {
    const vectors = [];

    for(let i = 0; i < units.length; i = i + 2) {
      vectors.push(new Victor(units[i], units[i + 1]));
    }

    return vectors;
  }

  static getEdges(vertices) {
    return vertices.map((vertex, i) => ({
      start: vertex,
      end: vertices[i + 1 != vertices.length ? i + 1 : 0]
    }));
  }

  static getNormals(edges) {
    return edges.map(edge => {
      const normal = edge.end.clone().subtract(edge.start);
      const x = normal.x;
      normal.x = normal.y;
      normal.y = -x;
      return normal.norm();
    });
  }

}

