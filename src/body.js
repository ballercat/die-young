import Victor from 'victor';
import { isNil } from 'ramda';

export default class Body {
  constructor(options) {
    Object.assign(this.state, options || {});

    if (isNil(this.state.mass)) {
      this.state.mass = Math.Infinity;
    }

    if (isNil(this.state.position)) {
      this.state.position = new Victor(0, 0);
    }

    this.previousState = {
      mass: this.state.mass,
      position: this.state.position.clone()
    };
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
  }

}

