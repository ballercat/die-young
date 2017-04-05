/**
 * Shape is used for rendering and is attached to physics bodies
 */
import { POINT, LINE, CIRCLE, POLYGON } from './bodyTypes';
import Victor from 'victor';
import { compose } from 'ramda';
import { project } from './utils';

const hasPosition = body => body && body.x && body.y;

export default class Shape {
  // Graphics must be injected into shapes
  constructor(Graphics, renderOptions = {}, debug = false) {
    // Will throw anyway but at least helps us with why
    if (!Graphics)
      throw 'Graphics missing for Shape';
    this.graphics = new Graphics();
    Object.assign(this, renderOptions);

    this.debug = debug;
  }

  beginRender() {
    this.graphics.clear();
    if (this.fill)
      this.graphics.beginFill(this.fill);

    if (this.lineStyle)
      this.graphics.lineStyle(...this.lineStyle);
  }

  endRender(body) {
    if (this.fill)
      this.graphics.endFill();

    if (hasPosition(body)) {
      this.graphics.x = body.x;
      this.graphics.y = body.y;
    }
  }

  static renderFunction(Type) {
    return {
      [POINT]: 'renderPoint',
      [LINE]: 'renderLine',
      [CIRCLE]: 'renderCircle',
      [POLYGON]: 'renderPolygon'
    }[Type];
  }

  render(body) {
    let renderFunc = Shape.renderFunction(body.type);
    if (renderFunc) {
      if (this.debug) {
        renderFunc += 'Debug';
      }
      this[renderFunc](body);
    }
  }

  renderPoint(body) {}

  renderLine(line) {}

  renderCircle(circle) {}

  renderPolygon(polygon) {
    this.beginRender();
    // Path require to be closed, however units are not so we must append starting units to the end
    this.graphics.drawPolygon([...polygon.units, polygon.units[0], polygon.units[1]]);
    this.endRender(polygon);
  }

  renderPolygonDebug(polygon) {
    this.renderPolygon(polygon);
  }
};

