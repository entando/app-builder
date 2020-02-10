import { useState, useEffect } from 'react';

const cachedStylesheets = [];
const useStylesheets = (url) => {
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });
  useEffect(
    () => {
      if (cachedStylesheets.includes(url)) {
        setState({
          loaded: true,
          error: false,
        });
        return () => { };
      }
      cachedStylesheets.push(url);

      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.media = 'screen';
      stylesheet.href = url;

      const onStylesheetLoad = () => {
        setState({
          loaded: true,
          error: false,
        });
      };

      const onStylesheetError = () => {
        const index = cachedStylesheets.indexOf(url);
        if (index >= 0) cachedStylesheets.splice(index, 1);
        stylesheet.remove();

        setState({
          loaded: true,
          error: true,
        });
      };

      stylesheet.addEventListener('load', onStylesheetLoad);
      stylesheet.addEventListener('error', onStylesheetError);

      document.body.appendChild(stylesheet);

      return () => {
        stylesheet.removeEventListener('load', onStylesheetLoad);
        stylesheet.removeEventListener('error', onStylesheetError);
      };
    },
    [url],
  );

  return [state.loaded, state.error];
};

export default useStylesheets;
