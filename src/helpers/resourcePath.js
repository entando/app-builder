/* eslint-disable import/prefer-default-export */
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const getDomain = () => {
  const { DOMAIN } = getRuntimeEnv();
  return DOMAIN;
};

export const getResourcePath = resource => `${getDomain()}/cmsresources/${resource}`;
