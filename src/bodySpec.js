import Body from './body';

describe('Body', () => {
  const body = new Body({
    body: {}
  });

  it('has state', () => {
    expect(body.state).toBeDefined();
  });

  it('has previousState', () => {
    expect(body.previousState).toBeDefined();
  });
});

describe('Body state', () => {
  const body = new Body({
    body: {}
  });

  it('it has a mass', () => {
    expect(body.state.mass).toBeDefined();
  });

  it('it has a position', () => {
    expect(body.state.position).toBeDefined();
  });

  it('it has forces', () => {
    expect(body.state.forces).toBeDefined();
  });
});

