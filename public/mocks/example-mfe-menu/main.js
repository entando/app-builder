class ExampleMfeMenu extends HTMLElement {
  css = `
    .example-mfe-menu {
      padding: 1rem 0;
    } 
    
    .example-mfe-menu__item {
      display: block;
      padding: 1rem;
      color: white;
      text-decoration: none;
      cursor: pointer;
    }
  `

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  static observedAttribute() {
    return ['config'];
  }

  connectedCallback() {
    const ITEM_CLASSNAME = 'example-mfe-menu__item';
    const wrapper = document.createElement('div');

    const nav = document.createElement('nav');
    nav.className = 'example-mfe-menu';

    wrapper.appendChild(nav);

    const dashboardLink = document.createElement('a');
    dashboardLink.className = ITEM_CLASSNAME;
    dashboardLink.onclick = () => {
      window.appBuilderRouter.push('/dashboard');
    };
    dashboardLink.textContent = 'Dashboard';

    nav.appendChild(dashboardLink);

    const exampleMFELink = document.createElement('a');
    exampleMFELink.className = ITEM_CLASSNAME;
    exampleMFELink.onclick = () => {
      window.appBuilderRouter.push('/example-mfe');
    };
    exampleMFELink.textContent = 'Example PBC MFE';

    nav.appendChild(exampleMFELink);

    const style = document.createElement('style');
    style.innerHTML = this.css;

    this.shadow.appendChild(style);
    this.shadow.appendChild(wrapper);
  }
}

customElements.define('example-mfe-menu', ExampleMfeMenu);
