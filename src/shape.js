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
    polygon.edges.forEach((edge, i) => {
      this.graphics.lineStyle(1, 0x0000FF);
      const midPoint = [
        (edge.start.x + edge.end.x) / 2,
        (edge.start.y + edge.end.y) / 2
      ];
      this.graphics.moveTo(...midPoint);
      this.graphics.lineTo(polygon.normals[i].x + midPoint[0], polygon.normals[i].y + midPoint[1]);

      // this.graphics.moveTo(polygon.normals[i].x, polygon.normals[i].y);
      // this.graphics.lineTo(
      //   polygon.normals[i + 1 != polygon.normals.length ? i + 1 : 0].x,
      //   polygon.normals[i + 1 != polygon.normals.length ? i + 1 : 0].y
      // );
      let proj = project(edge.start, polygon.normals[i]);
      console.log('start', proj);
       this.graphics.lineStyle(2, 0x00FF00);
       this.graphics.moveTo(100 + proj.x, 100 + proj.y);
       proj = project(edge.end, polygon.normals[i]);
       this.graphics.lineTo(100 + proj.x, 100 + proj.y);
      console.log('end', proj);
    });
  }
};
