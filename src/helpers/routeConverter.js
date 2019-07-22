// eslint-disable-next-line import/prefer-default-export
export const routeConverter = (route, params = {}) => {
  const paramsArray = Object.keys(params);
  if (!paramsArray.length) {
    return route;
  }

  return paramsArray.reduce((result, key) => route.replace(`:${key}`, params[key]), route);
};
