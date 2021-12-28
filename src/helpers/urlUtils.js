import { get } from 'lodash';

export const adminConsoleUrl = url => `${get(process.env, 'REACT_APP_DOMAIN', '')}/${url}`;

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};
