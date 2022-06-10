import { get } from 'lodash';

export const adminConsoleUrl = url => `${get(process.env, 'DOMAIN', '')}/${url}`;

export const generateMfeRoutes = mfe => mfe.reduce((acc, curr) => {
  if (curr.paths) {
    const routes = [];
    curr.paths.forEach((route) => {
      const path = route.split('/').filter(Boolean).join('/');
      const mfeRoute = [curr.pbcName, curr.bundleName, path].join('/');
      const id = curr.id || `id-${curr.pbcName}-${curr.bundleName}-${route}`;
      const refactoredId = id.replace(/\s+/g, '-');
      routes.push({ route: `/${mfeRoute}`, id: refactoredId });
    });
    return [...acc, ...routes];
  }
  return acc;
}, []);
