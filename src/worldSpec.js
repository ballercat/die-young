import World, { getBodyGridBounds, GRID_SIZE } from './world';
import Polygon from './polygon';
import { consoleTap } from './utils';

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

const unit3 = [
  99.97563625745391, 2.2072958381843275,
  -59.616115224589194, 80.28647959356859,
  -16.29674431176072, -98.66314471390568,
  99.83842372316636, -5.682354131299165
];

const unit4 = [
  52.6024382534728, 85.04694873885589,
  18.92734690208401, 98.19244135496464,
  99.61818446302485, -8.730253392127613,
  99.9789262161968, -2.052879113897514
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

describe('getBodyGridBounds', () => {
});

describe('Collision grid', () => {

  it('places polygons into it', () => {
    const poly = new Polygon(unit3);
    const poly2 = new Polygon(unit4);

    const world = new World();
    world.add(poly, poly2);

    const grid = world.getCollisionGrid(world.bodies);
    expect(grid.length).toBe(GRID_SIZE);
  });
});



