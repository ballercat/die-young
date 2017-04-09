import World from './world';

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

