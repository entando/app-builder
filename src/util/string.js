// eslint-disable-next-line import/prefer-default-export
export const isEmpty = string => (
  typeof string === 'undefined' ||
  string === null ||
  (typeof string === 'string' &&
  string.trim().length === 0)
);
