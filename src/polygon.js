import Victor from 'victor';

export default class Polygon {
  constructor(units) {
    if (units.length % 2 > 0)
      throw 'unit array must be a power of two, containing x, y coordinates';

    this.units = [...units];
    this.vertices = Polygon.unitsToVecotrs(this.units);
    this.edges = Polygon.getEdges(this.vertices);
    this.normals = Polygon.getNormals(this.edges);
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
      end: vertices[i + 1 != vertices.length ? i : 0]
    }));
  }

  static getNormals(edges) {
    return edges.map(edge =>
      edge.start.clone()
        .subtract(edge.end)
        .normalize()
        .rotateDeg(90)
    );
  }

}

