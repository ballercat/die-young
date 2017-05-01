import Pixi from 'pixi.js'

const PIXI = window.PIXI;

export const Graphics = PIXI.Graphics;
export const Container = PIXI.Container;
export const defaultCanvas =  {
  antialias: false,
  transparent: true,
  resolution: 1
};
export const basicRenderer = (
  root,
  options = {
    width: 800,
    height: 600,
    canvas: defaultCanvas
  }
) => {
  const { width, height, canvas = defaultCanvas } = options;
  const renderer = PIXI.autoDetectRenderer(width, height, canvas);

  if (root.firstChild)
    root.removeChild(root.firstChild)

  // Basics
  renderer.view.style.border = '1px dashed black';
  root.appendChild(renderer.view);

  return renderer;
}


export default PIXI;

