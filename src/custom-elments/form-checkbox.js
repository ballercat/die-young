import CustomElement from './custom-element';

class FormCheckbox extends CustomElement {
  constructor() {
    super();

    this.shadow.innerHTML = `
      <div>
        <input type="checkbox" id="${this.id}" name="${this.name}">
        <label for="${this.id}">${this.label}</label>
      </div>
    `;
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(name) {
    this.setAttribute('name', name);
  }

  set label(label) {
    this.setAttribute('label', label);
  }

  get label() {
    return this.getAttribute('label');
  }

  get checked() {
    return this.checkbox.checked;
  }

  onChange(e) {
    const name = this.name;
    const value = this.checked;
    this.trigger('form-change', { name, value });
  }

  connectedCallback() {
    this.checkbox = this.shadow.getElementById(this.id);
    this.checkbox.addEventListener('change', this.onChange.bind(this));
  }
}

customElements.define('form-checkbox-element', FormCheckbox);

export default FormCheckbox;

