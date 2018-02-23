import { GROUPS } from 'test/mocks/groups';

// eslint-disable-next-line
export const getApiGroups = () => (
  new Promise((resolve) => {
    resolve(GROUPS);
  })
);
