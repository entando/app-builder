// eslint-disable-next-line import/prefer-default-export
export const compareSemanticVersions = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
