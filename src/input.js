import {
  pick,
  compose
} from 'ramda';

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

const getEventData = pick(['which', 'shiftKey', 'ctrlKey']);
const withHandlers = handlers => data => handlers.forEach(cb => cb(data));
const eventHandler = handlers => compose(withHandlers(handlers), getEventData);

class Input {
  constructor(global) {
    global = global || window;

    this.downCallbacks = [];
    this.upCallbacks = [];

    this.onkeydown = global.addEventListener('keydown', eventHandler(this.downCallbacks));
    this.onkeyup = global.addEventListener('keyup', eventHandler(this.upCallbacks));
  }

  onKeydown(callback) {
    this.downCallbacks.push(callback);
  }

  onKeyup(callback) {
    this.upCallbacks.push(callback);
  }
}

export default Input;

