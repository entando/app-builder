import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMfeById } from 'state/mfe/selectors';


// try to find the element by id
const isJSLoaded = id => document.getElementById(`script-${id}`);
const isCSSLoaded = id => document.getElementById(`style-${id}`);

// generates the <script> tag and track the loading status
const createScript = (id, asset, remove, setError) => {
  const script = document.createElement('script');
  script.src = asset;
  script.id = `script-${id}`;
  script.onload = () => {
    remove(asset);
  };
  script.onerror = () => {
    setError(true);
  };
  document.body.appendChild(script);
};

// generates the <style> tag and track the loading status
const createStyle = (id, asset, remove, setError) => {
  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.type = 'text/css';
  styles.media = 'screen';
  styles.href = asset;
  styles.id = `style-${id}`;
  styles.onload = () => {
    remove(asset);
  };
  styles.onerror = () => {
    setError(true);
  };
  document.getElementsByTagName('head')[0].appendChild(styles);
};

// inject asset to DOM accordingly to type
const injectAssetToDom = ({ id, assets = [] }, remove, setError) => {
  assets.forEach((asset) => {
    if (asset.endsWith('.js') && !isJSLoaded(id)) {
      createScript(id, asset, remove, setError);
    } else if (asset.endsWith('.css') && !isCSSLoaded((id))) {
      createStyle(id, asset, remove, setError);
    } else {
      remove(asset);
    }
  });
};

const useMfe = (mfeId) => {
  // if mfeId is already an object, return it, otherwise select it from store
  const mfe = useSelector(state => (typeof mfeId === 'object' ? mfeId : getMfeById(state, mfeId)));

  const [assetLoading, setAssetLoading] = useState([...(mfe.assets || [])]);
  const [hasError, setError] = useState(false);

  const removeAsset = useCallback((id) => {
    if (assetLoading.length) {
      setAssetLoading(assetLoading.filter(a => a !== id));
    }
  }, [assetLoading]);

  useEffect(() => {
    injectAssetToDom(mfe, removeAsset, setError);
  }, [mfe, mfe.id, removeAsset]);

  console.log(assetLoading);

  return { assetLoading: assetLoading.length > 0, mfe, hasError };
};

export default useMfe;
