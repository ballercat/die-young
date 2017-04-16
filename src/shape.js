/**
 * Shape is used for rendering and is attached to physics bodies
 */
import { POINT, LINE, CIRCLE, POLYGON } from './bodyTypes';
import { compose } from 'ramda';
import { project } from './utils';
import { add, mul, sub } from 'numericjs';

const hasPosition = body => body && body.x && body.y;

export default class Shape {
  // Graphics must be injected into shapes
  constructor(
    Graphics,
    renderOptions = {
      fill: [0, 1],
      lineStyle: [0, 0, 1]
    },
    debug = {}
  ) {
    // Will throw anyway but at least helps us with why
    if (!Graphics)
      throw 'Graphics missing for Shape';
    this.graphics = new Graphics();
    Object.assign(this, renderOptions);

    this.debug = debug;
  }

  clear() {
    this.graphics.clear();
  }

  beginRender(options = {}) {
    this.clear();
    const fill = options.fill || this.fill;
    const lineStyle = options.lineStyle || this.lineStyle;

    if (fill)
      this.graphics.beginFill(...fill);

    if (lineStyle)
      this.graphics.lineStyle(...lineStyle);
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

  render(body, options = {}) {
    let renderFunc = Shape.renderFunction(body.type);
    if (renderFunc) {
      if (this.debug) {
        renderFunc += 'Debug';
      }
      this[renderFunc](body, options);
    }
  }

  renderPoint(body) {}

  renderLine(line) {}

  renderCircle(circle) {}

  renderAABB(aabb, options) {
    this.beginRender(options);
    this.graphics.drawRect(aabb.dims[0][0], aabb.dims[1][1], aabb.halfSize * 2, aabb.halfSize * 2);
    this.endRender();
  }

  renderPolygon(polygon, options) {
    this.beginRender(options);
    const vertices = [].concat.apply([], polygon.vertices);
    // Path need to be closed, however units are not so we must append starting units to the end
    this.graphics.drawPolygon([...vertices, vertices[0], vertices[1]]);
    this.endRender(polygon);
  }

  renderPolygonDebug(polygon, options) {
    this.renderPolygon(polygon, options);
    if (polygon.edges && polygon.normals) {
      this.renderNormals(polygon.normals, polygon.edges);
    }
    if (this.debug.boundingBox && polygon.aabb) {
      const aabb = polygon.aabb;
      this.graphics.drawRect(...sub(aabb.center, aabb.halfSize), ...mul(aabb.halfSize, 2));
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

