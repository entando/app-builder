import { isEqual } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const generateJsonPatch = (obj1, obj2) => (
  Object.keys(obj1).reduce((operations, key) => (
    !isEqual(obj1[key], obj2[key])
      ? [...operations, {
        op: 'replace',
        path: `/${key}`,
        value: obj2[key],
      }]
      : operations
  ), [])
);
