import React from 'react';
import logo from 'logo.svg';

import pluginArray from 'entando-plugins';

import HelloWorldMessageContainer from 'ui/hello-world/containers/HelloWorldMessageContainer';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">
        <HelloWorldMessageContainer />
      </h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <div>
      <h1>Entando plugins menu items:</h1>
      { pluginArray.map(plugin => <plugin.menuItemComponent key={plugin.id} />) }
    </div>

    <div>
      <h1>Entando plugins ui Components:</h1>
      { pluginArray.map(plugin => <plugin.uiComponent key={plugin.id} />) }
    </div>

  </div>
);


export default App;
