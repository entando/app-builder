import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMfeById } from 'state/mfe/selectors';


// try to find the element by id
const isJSLoaded = id => document.getElementById(`script-${id}`);
const isCSSLoaded = id => document.getElementById(`style-${id}`);

// generates the <script> tag and track the loading status
const createScript = (id, asset, remove) => {
  const script = document.createElement('script');
  script.src = asset;
  script.id = `script-${id}`;
  script.onload = () => {
    remove(id);
  };
  document.body.appendChild(script);
};

// generates the <style> tag and track the loading status
const createStyle = (id, asset, remove) => {
  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.type = 'text/css';
  styles.media = 'screen';
  styles.href = asset;
  styles.id = `style-${id}`;
  styles.onload = () => {
    remove(id);
  };
  document.getElementsByTagName('head')[0].appendChild(styles);
};

// inject asset to DOM accordingly to type
const injectAssetToDom = ({ id, assets = [] }, add, remove) => {
  assets.forEach((asset) => {
    if (asset.endsWith('.js') && !isJSLoaded(id)) {
      createScript(id, asset, remove);
      add(asset);
    } else if (asset.endsWith('.css') && !isCSSLoaded((id))) {
      createStyle(id, asset, remove);
      add(asset);
    }
  });
};

const useMfe = (mfeId) => {
  const mfe = useSelector(state => getMfeById(state, mfeId));

  const [assetLoading, setAssetLoading] = useState([]);

  const removeAsset = useCallback((id) => {
    setAssetLoading(assetLoading.filter(a => a !== id));
  }, [assetLoading]);

  const addAsset = useCallback((id) => {
    setAssetLoading([...assetLoading, id]);
  }, [assetLoading]);

  useEffect(() => {
    injectAssetToDom(mfe, addAsset, removeAsset);
  }, [addAsset, mfe, mfe.id, removeAsset]);

  return [assetLoading, mfe];
};

export default useMfe;
