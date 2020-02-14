import { get } from 'lodash';
import React from 'react';

export const getResourcePath = (subdir, resource) => `${process.env.DOMAIN}/cmsresources/${subdir}/${resource}`;

export const isMicrofrontendWidgetForm = widget =>
  get(widget, 'bundleId') && get(widget, 'configUi.resources.length') && get(widget, 'configUi.customElement');

export const getMicrofrontend = customElement => document.querySelector(customElement);

// eslint-disable-next-line react/no-danger
export const renderMicrofrontend = customElement => (<div dangerouslySetInnerHTML={{ __html: `<${customElement} />` }} />);
