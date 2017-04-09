/**
 * World contains physics bodies and is what
 * we use to run the simulation.
 */

export default class World {
  constructor() {
    this.bodies = [];
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

}

