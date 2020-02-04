import React from 'react';

export const getFilePath = (bundleId, resource) => `${process.env.DOMAIN}/cmsresources/${bundleId}/${resource}`;

export const getMfe = customElement => document.querySelector(customElement);

// eslint-disable-next-line react/no-danger
export const renderMfe = customElement => (<div dangerouslySetInnerHTML={{ __html: `<${customElement} />` }} />);
