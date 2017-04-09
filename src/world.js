/**
 * World contains physics bodies and is what
 * we use to run the simulation.
 */

// TODO: this needs to be at least 1/2 of 60fps
const FIXED_TIMESTEP = 1 / 60.0;

export default class World {
  constructor() {
    this.bodies = [];
  }

  static getTimeStep() {
    return FIXED_TIMESTEP;
  }

  add(body) {
    if (!body)
      return body;

    if (body._uuid && this.bodies[body._uuid] != body._uuid) {
      this.bodies[body._uuid] = body;
    } else if(!body._uuid) {
      this.bodies.push[body];
      body._uuid = this.bodies.length;
    }

    return body;
  }

  /**
   * Simulate the world by the predefined step
   */
  step() {
  }

  /**
   * Returns collision pairs
   */
  getCollisionPairs() {

  }
}

