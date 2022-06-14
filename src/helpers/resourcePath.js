/* eslint-disable import/prefer-default-export */
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const getDomain = () => {
  const { DOMAIN } = getRuntimeEnv();
  return DOMAIN;
};

const getResource = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'cmsresources';
  }
  return 'resources';
};

export const getResourcePath = resource => `${getDomain()}/${getResource()}/${resource}`;
