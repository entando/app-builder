import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMfeById } from 'state/mfe/selectors';
import { getResourcePath } from 'helpers/resourcePath';

const { USE_MFE_MOCKS } = process.env;

const getMfeResourcePath = (path) => {
  if (USE_MFE_MOCKS) {
    return path;
  }
  return getResourcePath(path);
};


// try to find the element by id
const isJSLoaded = id => document.getElementById(`script-${id}`);
const isCSSLoaded = id => document.getElementById(`style-${id}`);

// generates the <script> tag and track the loading status
const createScript = (id, asset, remove, setError) => {
  const script = document.createElement('script');
  script.src = getMfeResourcePath(asset);
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
  styles.href = getMfeResourcePath(asset);
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
  const mfe = useSelector(state => getMfeById(state, mfeId));

  const memoMfe = useMemo(() => (typeof mfeId === 'object' ? mfeId : mfe), [mfe, mfeId]);

  const [assetLoading, setAssetLoading] = useState([...(mfe.assets || [])]);
  const [hasError, setError] = useState(false);

  const removeAsset = useCallback((id) => {
    if (assetLoading.length) {
      setAssetLoading(assetLoading.filter(a => a !== id));
    }
  }, [assetLoading]);

  useEffect(() => {
    injectAssetToDom(memoMfe, removeAsset, setError);
  }, [memoMfe, memoMfe.id, removeAsset]);

  return { assetLoading: assetLoading.length > 0, mfe: memoMfe, hasError };
};

export default useMfe;
