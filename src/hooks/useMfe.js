import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMfeById } from 'state/mfe/selectors';


// try to find the element by id
const isLoaded = (id) => {
  const script = document.getElementById(`script-${id}`);
  const style = document.getElementById(`style-${id}`);
  return script && style;
};

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
const injectAssetToDom = ({ id, assets }, add, remove) => {
  assets.forEach((asset) => {
    add(asset);
    if (asset.endsWith('.js')) {
      createScript(id, asset, remove);
    } else if (asset.endsWith('.css')) {
      createStyle(id, asset, remove);
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
    if (!isLoaded(mfe.id)) {
      injectAssetToDom(mfe, addAsset, removeAsset);
    }
  }, [addAsset, mfe, mfe.id, removeAsset]);

  return [assetLoading, mfe];
};

export default useMfe;
