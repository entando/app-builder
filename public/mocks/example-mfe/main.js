
class ExampleMFE extends HTMLElement {
  styles = ` 
    .wrapper {
      padding-top: 60px;
      width: 860px;
      margin: 0 auto;
    }
    
    blockquote {
      border-left: 1px solid #e5e5e5;
      margin: 0;
      padding: 0 0 0 20px;
      font-style: italic;
    }
    
    code,
    pre {
      font-family: Monaco, Bitstream Vera Sans Mono, Lucida Console, Terminal, Consolas, Liberation Mono, DejaVu Sans Mono, Courier New, monospace;
      color: #333;
      font-size: 12px;
    }
    
    pre {
      padding: 8px 15px;
      background: #f8f8f8;
      border-radius: 5px;
      border: 1px solid #e5e5e5;
      overflow-x: auto;
    }


    strong {
      color: #222;
      font-weight: 700;
    }
    
    section {
      width: 500px;
      float: right;
      padding-bottom: 50px;
    }
    
    small {
      font-size: 11px;
    }
    
    hr {
      border: 0;
      background: #e5e5e5;
      height: 1px;
      margin: 0 0 20px;
    }
    
    footer {
      width: 270px;
      float: left;
      position: fixed;
      bottom: 50px;
      -webkit-font-smoothing: subpixel-antialiased;
    }
    
    div.wrapper {
      width: auto;
      margin: 0;
    }
    
    section,
    footer {
      float: none;
      position: static;
      width: auto;
    }
    
    
    section {
      border: 1px solid #e5e5e5;
      border-width: 1px 0;
      padding: 20px 0;
      margin: 0 0 20px;
    }

    ul {
      list-style-position: outside;
    }
    
    .keys li {
      padding: 0;
      margin: 0 0 10px 0;
    }
    
    kbd {
      padding: .1em .6em;
      border: 1px solid rgba(63, 63, 63, 0.25);
      -webkit-box-shadow: 0 1px 0 rgba(63, 63, 63, 0.25);
      box-shadow: 0 1px 0 rgba(63, 63, 63, 0.25);
      font-size: 0.9em;
      font-family: sans-serif;
      background-color: #fff;
      color: #333;
      border-radius: 3px;
      display: inline-block;
      margin: 0 .1em;
      white-space: nowrap;
    }
    `

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <main class="wrapper">
        <h1>App Builder Example PBC MFE</h1>
        <p>An example MFE that render inside AppBuilder</p>
        
        <section>
          <h3>Demo</h3>
          <div id="container">
            <select placeholder="Select Value">
              <option value="1" selected>Argentina</option>
              <option value="2">Austraoptiona</option>
              <option value="3">Brazil</option>
              <option value="4">Canada</option>
              <option value="5">China</option>
              <option value="6">France</option>
              <option value="7">Germany</option>
              <option value="8">India</option>
              <option value="9">Mexico</option>
              <option value="10">Russia</option>
              <option value="11">United States</option>
            </select>
          </div>
        </section>
        <h3>Keys</h3>
        <ul class="keys">
          <li>Open the select: <kbd>Alt</kbd> + <kbd>&darr;</kbd></li>
          <li>Close the select: <kbd>Alt</kbd> + <kbd>&uarr;</kbd></li>
          <li>Close the select: <kbd>Esc</kbd></li>
          <li>Navigate through items: <kbd>&uarr;</kbd> or <kbd>&darr;</kbd></li>
          <li>Select an item when select is opened: <kbd>Enter</kbd>
            <li>Deselect the last selected item: <kbd>Backspace</kbd>
        </ul>
      </main>
    `;

    const style = document.createElement('style');
    style.innerHTML = this.styles;

    this.shadow.appendChild(style);
    this.shadow.appendChild(wrapper);
  }
}

customElements.define('example-mfe', ExampleMFE);
