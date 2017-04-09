import Polygon from './polygon';
import { POLYGON } from './bodyTypes';
import { compose, is, has, all } from 'ramda';

// pentagon
const units = [
  0, 0.5,
  0.25, 0,
  0.5, 0,
  0.75, 0.5,
  1, 1
];
const VERTEX_COUNT = 5;
const isVector = v => is(Array, v) && v.length === 2;
const isEdge = obj => has('start', obj) && has('end', obj);
const unitsToEdges = compose(Polygon.getEdges, Polygon.unitsToVecotrs);
const unitsToNormals = compose(Polygon.getNormals, unitsToEdges);

describe('unitsToVectors', () => {
  it('takes an array of vector units and creates vectors', () => {
    const vectors = Polygon.unitsToVecotrs(units);
    expect(vectors.length).toBe(VERTEX_COUNT);
    expect(all(isVector, vectors)).toBe(true);
  });
});

describe('getEdges', () => {
  it('takes an array of vectors and creates { start, end } vector pairs', () => {
    const edges = unitsToEdges(units);
    expect(edges.length).toBe(VERTEX_COUNT);
    expect(all(isEdge, edges)).toBe(true);
  });
});

describe('getNormals', () => {
  it('returns a normal for each edge', () => {
    const normals = unitsToNormals(units);
    expect(normals.length).toBe(VERTEX_COUNT);
    expect(all(isVector, normals)).toBe(true);
  });
});

describe('Polygon', () => {
  let poly;
  beforeEach(() => {
    poly = new Polygon(units);
  });

  it('assigns vertices via passed in points array', () => {
    expect(poly.vertices.length).toBe(VERTEX_COUNT);
  });

  it('has a position vector array', () => {
    expect(isVector(poly.position)).toBe(true);
  });

  it('assigns edges via passed in points array', () => {
    expect(poly.edges.length).toBe(VERTEX_COUNT);
  });

  it('has a body type of POLYGON', () => {
    expect(poly.type).toBe(POLYGON);
  });
});

