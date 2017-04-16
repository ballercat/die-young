import CustomElement from './custom-element';
import './form-checkbox';

class WorkbenchElement extends CustomElement {
  constructor() {
    super();

    this.shadow.innerHTML = `
      <form>
        <form-checkbox-element
          name="showGrid"
          label="Enable grid"
        >
        </form-checkbox-element>
        <form-checkbox-element
          name="showAABB"
          label="Enable Bounding Boxes"
        >
        </form-checkbox-element>
      </form>
    `;
  }

  handleChange(e) {
    const { detail } = e;
    console.log(detail);
  }

  connectedCallback() {
    this.addEventListener('form-change', this.handleChange.bind(this));
  }
}

customElements.define('workbench-element', WorkbenchElement);

export default WorkbenchElement;
