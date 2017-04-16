import { is } from 'ramda';

const isFunction = is(Function);

let count = 0;

export default class CustomElement extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
    this.__uuid = `custom-element-${count}`;
    count++;
  }

  trigger(name, detail = {}) {
    const event = new CustomEvent(
      name,
      {
        bubles: true,
        composed: true,
        detail
      }
    );
    this.dispatchEvent(event);
  }

  get id() {
    return this.__uuid;
  }
}

