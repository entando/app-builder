class ExampleMFE extends HTMLElement {
  connectedCallback() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div class="example-mfe">
        this is an example MFE
      </div>
    `;

    this.appendChild(wrapper);
  }
}

customElements.define('example-mfe', ExampleMFE);
