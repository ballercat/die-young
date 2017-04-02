import Pixi from 'pixi.js'

const PIXI = window.PIXI;

export const Graphics = PIXI.Graphics;
export const Container = PIXI.Container;
export const basicRenderer = (root) => {
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const CANVAS_OPTIONS = {
    antialias: false,
    transparent: true,
    resolution: 1
  };

  const renderer = PIXI.autoDetectRenderer(
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    CANVAS_OPTIONS
  );
  // Basics
  renderer.view.style.border = '1px dashed black';
  root.appendChild(renderer.view);

  return renderer;
}


export default PIXI;

