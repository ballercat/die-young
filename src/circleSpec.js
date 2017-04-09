import Circle from './circle';
import { isCollision } from './collision';

describe('Circle', () => {

  it('handles collisions', () => {
    const c1 = new Circle({
      center: [0, 0],
      radius: 1
    });
    const c2 = new Circle({
      center: [1, 1],
      radius: 2
    });

    let collision = c1.collision(c2);
    expect(isCollision(collision)).toBe(true);
    collision = c2.collision(c1);
    expect(isCollision(collision)).toBe(true);
  });

});

