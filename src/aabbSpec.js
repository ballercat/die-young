import AABB from './aabb';
import Victor from 'victor';
import { is } from 'ramda';

const isVictor = is(Victor);

describe('AABB', () => {

  it('should have center', () => {
    const aabb = new AABB();
    expect(isVictor(aabb.center)).toBe(true);
  });

  it('should have halfSize', () => {
    const aabb = new AABB();
    expect(isVictor(aabb.halfSize)).toBe(true);
  });

  it('takes custom options', () => {
    const center = new Victor();
    const halfSize = new Victor();
    const aabb = new AABB({center, halfSize});

    expect(aabb.center).toBe(center);
    expect(aabb.halfSize).toBe(halfSize);
  });

  it('can resolve collisions', () => {
    const aabb = new AABB({
      center: new Victor(0.5, 0.5),
      halfSize: new Victor(0.5, 0.5)
    });
    const other = new AABB({
      center: new Victor(0.5, 0.5),
      halfSize: new Victor(0.5, 0.5)
    });

    expect(aabb.collides(other)).toBe(true);
    expect(other.collides(aabb)).toBe(true);
  });

  it('handles collisions correctly', () => {
    const aabb = new AABB({
      center: new Victor(0, 0.5),
      halfSize: new Victor(0.5, 0.5)
    });
    const other = new AABB({
      center: new Victor(0, 2),
      halfSize: new Victor(0.5, 0.5)
    });

    expect(aabb.collides(other)).toBe(false);
    expect(other.collides(aabb)).toBe(false);
  });
});

