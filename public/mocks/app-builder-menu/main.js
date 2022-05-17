class AppBuilderMenuMFE extends HTMLElement {
  connectedCallback() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div class="app-builder-menu-mfe">
        this is an example of MFE menu
      </div>
    `;

    this.appendChild(wrapper);
  }
}

customElements.define('app-builder-menu', AppBuilderMenuMFE);
