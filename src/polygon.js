import { POLYGON } from './bodyTypes';
import AABB from './aabb';
import { add, clone, div, sub, norm2 } from 'numericjs';

export default class Polygon {
  constructor(units, x = 0, y = 0) {
    if (units.length % 2 > 0)
      throw 'unit array must be a power of two, containing x, y coordinates';

    this.type = POLYGON;
    this.units = [...units];
    this.vertices = Polygon.unitsToVecotrs(this.units);
    this.edges = Polygon.getEdges(this.vertices);
    this.normals = Polygon.getNormals(this.edges);

    this.position = [x, y];

    this.aabb = this.getAABB();
  }

  static fromArray(array) {
    return new Polygon(array);
  }

  static fromArraySegment(start, end, source) {
    return new Polygon(source.slice(start, end));
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

  getAABB() {
    const vertexCount = this.vertices.length;
    const max = [Number.MIN_VALUE, Number.MIN_VALUE];
    const min = [Number.MAX_VALUE, Number.MAX_VALUE];
    for(let i = 0; i < vertexCount; i++) {
      const vertex = this.vertices[i];
      if (vertex[0] > max[0]) {
        max[0] = vertex[0];
      } else if (vertex[0] < min[0]) {
        min[0] = vertex[0];
      }

      if (vertex[1] > max[1]) {
        max[1] = vertex[1]
      } else if (vertex[1] < min[1]) {
        min[1] = vertex[1];
      }
    }

    return new AABB({
      center: div(add(max, min), 2),
      halfSize: div(sub(max, min), 2)
    });
  }

  static unitsToVecotrs(units) {
    const length = units.length / 2;
    const vectors = new Array(length);

    for(let i = 0, j = 0; i < length; i++, j = i << 1) {
      vectors[i] = units.slice(j, j + 2);
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
      const normal = sub(edge.end, edge.start);
      const x = normal[0];
      normal[0] = normal[1];
      normal[1] = -x;
      return div(normal, norm2(normal));
    });
  }
}


