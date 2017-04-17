import CustomElement from './custom-element';

class FormCheckbox extends CustomElement {
  constructor() {
    super();

    // this.shadow.innerHTML = `
		// 	<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${this.id}">
		// 		<input type="checkbox" id="${this.id}" class="mdl-checkbox__input">
		// 		<span class="mdl-checkbox__label">${this.label}</span>
		// 	</label>
    // `;
    const t = document.getElementById("template-form-checkbox").import;
    const instance = t.getElementById('template').content.cloneNode(true);
    this.shadow.appendChild(instance);
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
    debugger;
    this.trigger('form-change', { name, value });
  }

  connectedCallback() {
    this.checkbox = this.shadow.querySelector(`#${this.id}`);
    this.checkbox.addEventListener('change', this.onChange.bind(this));
  }
}

customElements.define('form-checkbox-element', FormCheckbox);

export default FormCheckbox;

