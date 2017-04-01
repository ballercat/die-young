import Circle from './circle';
import Victor from 'victor';
import { isCollision } from './collision';

describe('Circle', () => {

  it('handles collisions', () => {
    const c1 = new Circle({
      center: new Victor(0, 0),
      radius: 1
    });
    const c2 = new Circle({
      center: new Victor(1, 1),
      radius: 2
    });

    let collision = c1.collides(c2);
    expect(isCollision(collision)).toBe(true);
    collision = c2.collides(c1);
    expect(isCollision(collision)).toBe(true);
  });

});

