class ExampleMfeMenu extends HTMLElement {
  connectedCallback() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div class="example-mfe-menu">
        this is an example of MFE menu
      </div>
    `;

    this.appendChild(wrapper);
  }
}

customElements.define('example-mfe-menu', ExampleMfeMenu);
