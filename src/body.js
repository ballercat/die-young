import Polygon from './polygon';
import { isNil, has } from 'ramda';
import { POLYGON, CIRCLE } from './bodyTypes';
import AABB from './aabb';
import { clone } from 'numericjs';

const hasBody = has('body');
const STATIC_BODY_MASS = Number.POSITIVE_INFINITY;
const LINE_COLLISION = [2, 0xFF3300];
const LINE = [2, 0x003300];

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

    this.previousState = {
      mass: this.state.mass,
      body: this.state.body,
      position: clone(this.state.position)
    };
  }

  onCollision(body) {
    this.shape.lineStyle = LINE_COLLISION;
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
    // Update physics here
  }

  render() {
    this.shape.render(this.body);
    this.shape.lineStyle = LINE;
  }
}

