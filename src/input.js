
const handler = key => cb => e => e.keyCode === key ? cb(e) : null;

export const KEY_J = 74;
export const KEY_K = 75;
export const KEY_L = 76;
export const KEY_I = 73;

const UP    = KEY_I;
const DOWN  = KEY_K;
const LEFT  = KEY_J;
const RIGHT = KEY_L;

export {
  UP,
  DOWN,
  LEFT,
  RIGHT,
};

class Input {
  constructor() {
    this.onkeydown = window.addEventListener('keydown', (e) => {
      this.downCallbacks.each(cb => cb(data));
    });

    this.downCallbacks = [];
    this.upCallbacks = [];
  }

  onKeydown(callback) {
  }

}

export default handler;

