import Polygon from './polygon';
import { isNil, has } from 'ramda';
import { POLYGON, CIRCLE } from './bodyTypes';
import AABB from './aabb';
import { div, clone, add, mul } from 'numericjs';

const hasBody = has('body');
const STATIC_BODY_MASS = Number.POSITIVE_INFINITY;
const LINE_COLLISION = [2, 0xFF3300];
const LINE = [2, 0x003300];

const unitsToVectors = (units) => {
  const length = units.length / 2;
  const vectors = new Array(length);

  for(let i = 0, j = 0; i < length; i++, j = i << 1) {
    vectors[i] = units.slice(j, j + 2);
  }

  return vectors;
};

export default class Body {
  constructor(options = {}) {
    if (!hasBody(options)) {
      throw 'body is required';
    }

    this.state = Object.assign({}, options);

    if (isNil(this.state.mass)) {
      this.state.mass = STATIC_BODY_MASS;
    }

    if (isNil(this.state.position)) {
      this.state.position = [0, 0];
    }

    if (isNil(this.state.forces)) {
      this.state.forces = [];
    }

    if (isNil(this.state.acceleration)) {
      this.state.acceleration = [0, 0];
    }

    if (isNil(this.state.velocity)) {
      this.state.velocity = [0, 0];
    }

    this.copyStateToPrevious();
  }

  copyStateToPrevious() {
    this.previousState = {
      mass: this.state.mass,
      body: this.state.body,
      position: clone(this.state.position),
      acceleration: clone(this.state.acceleration),
      velocity: clone(this.state.velocity),
      forces: clone(this.state.forces)
    };
  }

  onCollision(body) {
    this.shape.render(
      this.body,
      {
        lineStyle: LINE_COLLISION
      }
    );

    // HACK! will need to remove
    // reset forces to pause any simulation
    this.state.forces = [];
  }

  static isStatic(body) {
    return body.mass === STATIC_BODY_MASS;
  }

  get AABB() {
    const aabb = this.body.aabb;
    aabb.center = this.position;

    return aabb;
  }

  attachShape(shape) {
    this.shape = shape;
  }

  set body(body) {
    this.state.body = body;
  }

  get body() {
    return this.state.body;
  }

  get aabb() {
    return this.state.body.aabb;
  }

  get mass() {
    return this.state.mass;
  }

  get position() {
    return clone(this.state.position);
  }

  set mass(mass) {
    this.state.mass = mass;
  }

  set position(position) {
    this.state.position = clone(position);
  }

  update(delta) {
    if (!this.state.forces.length)
      return;

    debugger;
    // Update physics here
    this.copyStateToPrevious();
    const i = mul(this.state.velocity, delta);
    const j = mul(mul(this.previousState.acceleration, 0.5), Math.pow(delta, 2));
    const position = add(this.state.position, add(i, j));
    const allForces = add(...this.state.forces);
    const acceleration = div(allForces, this.state.mass);
    const averageAcceleration = div(add(this.state.acceleration, acceleration), 2);
    const velocity = add(this.state.velocity, mul(averageAcceleration, delta));

    Object.assign(this.state, {
      position,
      acceleration,
      velocity
    });

    this.body.position = this.state.position;
    this.body.vertices = unitsToVectors(this.body.units).map(vertex => add(vertex, position));

    //    console.log(this.body.position);

    this.render();
  }

  render() {
    this.shape.render(this.body);
  }
}

