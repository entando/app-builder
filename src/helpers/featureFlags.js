const getProcessEnvVar = envVar => process.env[envVar] || '';

const getWindowEnvVar = envVar => (window && window.env && window.env[envVar] ? window.env[envVar] : '');

const getRawValue = (envVar) => {
  if (process.env.NODE_ENV === 'development') {
    return getProcessEnvVar(envVar);
  }
  return getWindowEnvVar(envVar) || getProcessEnvVar(envVar);
};

const FEATURE_FLAGS_KEY = 'ENTANDO_FEATURE_FLAGS';

export const getFeatureFlags = () => {
  const raw = getRawValue(FEATURE_FLAGS_KEY);
  if (!raw) return [];
  return raw.split(',').map(f => f.trim()).filter(Boolean);
};

export const hasFeatureFlag = flag => getFeatureFlags().includes(flag);

// Known feature flags
export const FEATURE_FLAG_HEADLESS_WIDGET_CONFIG = 'HEADLESS_WIDGET_CONFIG';
