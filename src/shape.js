/**
 * Shape is used for rendering and is attached to physics bodies
 */
import { POINT, LINE, CIRCLE, POLYGON } from './bodyTypes';
import { compose } from 'ramda';
import { project } from './utils';
import { sub } from 'numericjs';

const hasPosition = body => body && body.x && body.y;

export default class Shape {
  // Graphics must be injected into shapes
  constructor(Graphics, renderOptions = {}, debug = true) {
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

  renderAABB(aabb) {
    this.beginRender();
    this.graphics.drawRect(aabb.dims[0][0], aabb.dims[1][1], aabb.halfSize * 2, aabb.halfSize * 2);
    this.endRender();
  }

  renderPolygon(polygon) {
    this.beginRender();
    // Path need to be closed, however units are not so we must append starting units to the end
    this.graphics.drawPolygon([...polygon.units, polygon.units[0], polygon.units[1]]);
    this.endRender(polygon);
  }

  renderPolygonDebug(polygon) {
    this.renderPolygon(polygon);
    if (polygon.edges && polygon.normals) {
      this.renderNormals(polygon.normals, polygon.edges);
    }
    if (polygon.aabb) {
      const aabb = polygon.aabb;
      this.graphics.drawRect(...sub(aabb.center, aabb.halfSize), aabb.halfSize[0] * 2, aabb.halfSize[1] * 2);
    }
  }

  renderNormals(normals, edges) {
    edges.map((edge, i) => {
      this.graphics.lineStyle(1, 0x0000FF);
      const midpoint = [
        (edge.start[0] + edge.end[0]) / 2,
        (edge.start[1] + edge.end[1]) / 2
      ];
      this.graphics.moveTo(...midpoint);
      this.graphics.lineTo(normals[i][0] + midpoint[0], normals[i][1] + midpoint[1]);
    });
  }
};

