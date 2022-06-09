import { get } from 'lodash';

export const adminConsoleUrl = url => `${get(process.env, 'DOMAIN', '')}/${url}`;

export const generateMfeRoutes = mfe => mfe.reduce((acc, curr) => {
  if (curr.paths) {
    const routes = [];
    curr.paths.forEach((route) => {
      routes.push({ route: `/${curr.pbcName}/${curr.bundleName}${route}`, id: curr.id || `id-${curr.pbcName}-${curr.bundleName} - ${route}` });
    });
    return [...acc, ...routes];
  }
  return acc;
}, []);
