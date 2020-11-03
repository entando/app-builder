import { get } from 'lodash';
import React from 'react';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const getDomain = () => {
  const { DOMAIN } = getRuntimeEnv();
  return DOMAIN;
};

export const getResourcePath = resource => `${getDomain()}/cmsresources/${resource}`;

export const hasMicrofrontendConfig = widget =>
  get(widget, 'configUi.resources.length') && get(widget, 'configUi.customElement');

export const getMicrofrontend = customElement => document.querySelector(customElement);

// eslint-disable-next-line react/no-danger
export const renderMicrofrontend = customElement => (<div dangerouslySetInnerHTML={{ __html: `<${customElement} />` }} />);
