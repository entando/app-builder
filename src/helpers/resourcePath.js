/* eslint-disable import/prefer-default-export */
import getRuntimeEnv from 'helpers/getRuntimeEnv';

export const getDomain = () => {
  const { DOMAIN } = getRuntimeEnv();
  return DOMAIN;
};
