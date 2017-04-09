import AABB from './aabb';
import { isVector } from './utils';

describe('AABB', () => {

  it('should have center', () => {
    const aabb = new AABB();
    expect(isVector(aabb.center)).toBe(true);
  });

  it('should have halfSize', () => {
    const aabb = new AABB();
    expect(isVector(aabb.halfSize)).toBe(true);
  });

  it('takes custom options', () => {
    const center = [0, 0]
    const halfSize = [0, 0];
    const aabb = new AABB({center, halfSize});

    expect(aabb.center).toBe(center);
    expect(aabb.halfSize).toBe(halfSize);
  });

  it('can resolve collisions', () => {
    const aabb = new AABB({
      center: [0.5, 0.5],
      halfSize: [0.5, 0.5]
    });
    const other = new AABB({
      center: [0.5, 0.5],
      halfSize: [0.5, 0.5]
    });

    expect(aabb.collides(other)).toBe(true);
    expect(other.collides(aabb)).toBe(true);
  });

  it('handles collisions correctly', () => {
    const aabb = new AABB({
      center: [0, 0.5],
      halfSize: [0.5, 0.5]
    });
    const other = new AABB({
      center: [0, 2],
      halfSize: [0.5, 0.5]
    });

    expect(aabb.collides(other)).toBe(false);
    expect(other.collides(aabb)).toBe(false);
  });
});

