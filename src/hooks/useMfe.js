import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMfeById } from 'state/mfe/selectors';
import { generateUrlFromTenantAndResource } from 'hooks/useDynamicResourceUrl';
import { selectCurrentTenant } from 'state/multi-tenancy/selectors';


// try to find the element by id
const isJSLoaded = id => document.getElementById(`script-${id}`);
const isCSSLoaded = id => document.getElementById(`style-${id}`);

// generates the <script> tag and track the loading status
const createScript = (id, asset, remove, setError, tenant) => {
  const script = document.createElement('script');
  script.src = generateUrlFromTenantAndResource({ tenant, resource: asset });
  script.id = `script-${id}`;
  script.type = 'module';
  script.onload = () => {
    remove(asset);
  };
  script.onerror = () => {
    setError(true);
  };
  document.body.appendChild(script);
};

// generates the <style> tag and track the loading status
const createStyle = (id, asset, remove, setError, tenant) => {
  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.type = 'text/css';
  styles.media = 'screen';
  styles.href = generateUrlFromTenantAndResource({ tenant, resource: asset });
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
const injectAssetToDom = ({ id, assets = [] }, remove, setError, tenant) => {
  assets.forEach((asset) => {
    const assetId = `${id}-${asset}`;
    if (asset.endsWith('.js') && !isJSLoaded(assetId)) {
      createScript(assetId, asset, remove, setError, tenant);
    } else if (asset.endsWith('.css') && !isCSSLoaded((id))) {
      createStyle(assetId, asset, remove, setError, tenant);
    } else {
      remove(asset);
    }
  });
};

const deleteAssetFromDom = ({ id, assets = [] }) => {
  assets.forEach((asset) => {
    if (asset.endsWith('.js')) {
      const script = document.getElementById(`script-${id}-${asset}`);
      if (script) {
        script.remove();
      }
    } else if (asset.endsWith('.css')) {
      const styles = document.getElementById(`style-${id}-${asset}`);
      if (styles) {
        styles.remove();
      }
    }
  });
};

const EMPTY_OBJECT = {};

const useMfe = ({ mfeId, initialMfe }) => {
  const mfe = useSelector(state => getMfeById(state, mfeId));
  const tenant = useSelector(selectCurrentTenant) || EMPTY_OBJECT;

  const memoMfe = useMemo(() => initialMfe || mfe, [initialMfe, mfe]);
  const memoAssetsLoading = useMemo(() => [...(memoMfe.assets || [])], [memoMfe.assets]);
  const [assetLoading, setAssetLoading] = useState(memoAssetsLoading);
  const [hasError, setError] = useState(false);

  const removeAsset = useCallback((id) => {
    setAssetLoading(prev => (prev || []).filter(a => a !== id));
  }, []);

  useEffect(() => {
    injectAssetToDom(memoMfe, removeAsset, setError, tenant);
    return () => {
      deleteAssetFromDom(memoMfe);
    };
  }, [memoMfe, memoMfe.id, removeAsset, tenant]);

  return { assetLoading: assetLoading.length > 0, mfe: memoMfe, hasError };
};

export default useMfe;
