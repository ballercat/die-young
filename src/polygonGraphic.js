import pixi from './renderer';

const { Graphics } = pixi;

const polygonGraphic = (shape, options) => {
  // Acceptable path for a polygon must close on itself
  const path = [...shape.units, shape.units[0], shape.units[1]];
  const graphic  = new Graphics();
  graphic.beginFill(options.fill);
  graphic.lineStyle(...options.lineStyle);
  graphic.drawPolygon(path);

  return graphic;
}

export default polygonGraphic;

