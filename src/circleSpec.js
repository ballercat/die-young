import Circle from './circle';
import Victor from 'victor';

describe('Circle', () => {

  it('handles collisions', () => {
    const c1 = new Circle({
      center: new Victor(0, 0),
      radius: 1
    });
    const c2 = new Circle({
      center: new Victor(1, 1),
      radius: 1.5
    });

    expect(c1.collides(c2)).toBe(true);
    expect(c2.collides(c1)).toBe(true);
  });

});

