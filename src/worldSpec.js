import World from './world';
import Polygon from './polygon';

const unit = [
  96.27643805506328, 27.034190859531222,
  77.45618300774669, 63.249819872237204,
  -83.40863567470004, 55.163389080849235
];
const unit2 = [
  99.75390716138122, 7.011277061886497,
  -99.72271578604254, 7.441771042983217,
  -48.71849886676113, -87.32987958407703,
  -18.993226756603683, -98.17971958287634,
  20.769639852398996, -97.81933377610808
];

describe('World class', () => {
  const world = new World();

  it('contains bodies', () => {
    expect(world.bodies).toBeDefined();
  });

  it('can add bodies', () => {
    expect(world.add).toBeDefined();
  });

  it('can run a simulation', () => {
    expect(world.step).toBeDefined();
  });
});

describe('Collision grid', () => {

  it('places polygons into it', () => {
    const poly = new Polygon(unit);
    const poly2 = new Polygon(unit2);

    const world = new World();
    world.add(poly, poly2);

    const grid = world.getCollisionGrid(world.bodies);
    expect(grid.length).toBe(4);
  });

});

