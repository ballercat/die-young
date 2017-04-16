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
const unitsToEdges = compose(Polygon.getEdges, Polygon.unitsToVectors);
const unitsToNormals = compose(Polygon.getNormals, unitsToEdges);

describe('unitsToVectors', () => {
  it('takes an array of vector units and creates vectors', () => {
    const vectors = Polygon.unitsToVectors(units);
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

describe('aabb generation', () => {
  it('creates a correct AABB min vector', () => {
    const poly = new Polygon([
      96.27643805506328, 27.034190859531222,
      77.45618300774669, 63.249819872237204,
      -83.40863567470004, 55.163389080849235
    ]);

    const lowerBoundY = poly.aabb.bounds[0][1].toFixed(6);
    const expectedLowerBoundY = 27.034190859531222.toFixed(6);
    expect(lowerBoundY).toBe(expectedLowerBoundY);
  });

  it('calculates correct upper bounds', () => {
    const poly = new Polygon([
      -37.01120167243557, 92.8987133967005,
      -42.12165461950469, 90.69600990184276,
      -98.47097448417765, 17.420309530442807
    ]);

    const upperBoundX = poly.aabb.bounds[1][0].toFixed(6) / 1;
    const expectUpperBoundX = -37.011201672435575.toFixed(6) / 1;
    expect(upperBoundX).toBe(expectUpperBoundX);
  });
});

