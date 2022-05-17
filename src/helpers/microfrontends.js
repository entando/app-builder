import { get } from 'lodash';
import React from 'react';

export const isMicrofrontendWidgetForm = widget =>
  get(widget, 'configUi.resources.length') && get(widget, 'configUi.customElement');

export const getMicrofrontend = customElement => document.querySelector(customElement);

// eslint-disable-next-line react/no-danger
export const renderMicrofrontend = customElement => (<div dangerouslySetInnerHTML={{ __html: `<${customElement} />` }} />);

export const renderMicrofrontendWithParams = (customElement, params = {}) => {
  let props = '';
  Object.keys(params).forEach((key) => {
    props += ` ${key}="${typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]}"`;
  });
  // eslint-disable-next-line react/no-danger
  return (<div dangerouslySetInnerHTML={{ __html: `<${customElement} ${props}/>` }} />);
};
