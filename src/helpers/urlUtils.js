import { get } from 'lodash';

export const adminConsoleUrl = url => `${get(process.env, 'DOMAIN', '')}/${url}`;

export const generateMfeRoutes = mfe => mfe.reduce((acc, curr) => {
  if (curr.descriptorExt && curr.descriptorExt.paths) {
    const routes = [];
    curr.descriptorExt.paths.forEach((route) => {
      const path = route.split('/').filter(Boolean).join('/');
      const mfeRoute = [curr.bundleCode, path].join('/');
      const id = curr.id || `id-${curr.bundleGroup}-${curr.bundleCode}-${route}-${curr.widgetCode}`;
      const refactoredId = id.replace(/\s+/g, '-');
      routes.push({ route: `/${mfeRoute}`, id: refactoredId });
    });
    return [...acc, ...routes];
  }
  return acc;
}, []);
