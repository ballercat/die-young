import Victor from 'victor';
import Polygon from './polygon';
import { isNil, has } from 'ramda';

const hasBody = has('body');

export default class Body {
  constructor(options) {
    if (!hasBody(options)) {
      throw 'body is required';
    }

    Object.assign(this.state, options || {});

    if (isNil(this.state.mass)) {
      this.state.mass = Math.Infinity;
    }

    if (isNil(this.state.position)) {
      this.state.position = new Victor(0, 0);
    }

    this.previousState = {
      mass: this.state.mass,
      body: this.state.body,
      position: this.state.position.clone()
    };
  }

  attachShape(shape) {
    this.shape = shape;
  }

  get mass() {
    return this.state.mass;
  }

  get position() {
    return this.state.position;
  }

  set mass(mass) {
    this.state.mass = mass;
  }

  set position(position) {
    this.state.position.x = position.x;
    this.state.position.y = position.y;
  }

  update(delta) {
    // Update physics here
  }

  render() {
    this.shape.render(this.body);
  }
}

