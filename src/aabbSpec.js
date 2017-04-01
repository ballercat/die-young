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

  it('can resolve collisions', () => {

  });
});

