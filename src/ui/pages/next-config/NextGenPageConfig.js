import React, { useState, useEffect } from 'react';

import Editor from '@monaco-editor/react';
import files from './files';

function NextGenPageConfig() {
  const [fileName, setFileName] = useState('script.js');

  const file = files[fileName];

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        // Prevent the Save dialog to open
        e.preventDefault();
        // Place your code here
        console.log('CTRL + S');
      }
    });
  }, []);

  return (
    <React.Fragment>
      <button
        disabled={fileName === 'script.js'}
        onClick={() => setFileName('script.js')}
      >
        script.js
      </button>
      <button
        disabled={fileName === 'style.css'}
        onClick={() => setFileName('style.css')}
      >
        style.css
      </button>
      <button
        disabled={fileName === 'index.html'}
        onClick={() => setFileName('index.html')}
      >
        index.html
      </button>
      <Editor
        height="80vh"
        theme="vs-dark"
        // theme="light"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        saveViewState
        onChange={e => console.log('changed', e)}
      />
    </React.Fragment>
  );
}

export default NextGenPageConfig;
