class ExampleMFE extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div class="example-mfe">
        this is an example MFE
      </div>
    `;

    shadow.appendChild(wrapper);
  }
}

customElements.define('example-mfe', ExampleMFE);
