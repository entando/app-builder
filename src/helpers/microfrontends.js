import { get } from 'lodash';
import React from 'react';

export const getResourcePath = resource => `${process.env.DOMAIN}/resources/${resource}`;

export const isMicrofrontendWidgetForm = widget =>
  get(widget, 'configUi.resources.length') && get(widget, 'configUi.customElement');

export const getMicrofrontend = customElement => document.querySelector(customElement);

// eslint-disable-next-line react/no-danger
export const renderMicrofrontend = customElement => (<div dangerouslySetInnerHTML={{ __html: `<${customElement} />` }} />);
