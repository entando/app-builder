class AppBuilderHeaderMFE extends HTMLElement {
  connectedCallback() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div class="app-builder-header">
        this is an example of MFE header
      </div>
    `;

    this.appendChild(wrapper);
  }
}

customElements.define('app-builder-header', AppBuilderHeaderMFE);
