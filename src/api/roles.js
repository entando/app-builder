import { ROLES } from 'test/mocks/roles';

// eslint-disable-next-line
export const getApiRoles = () => (
  new Promise((resolve) => {
    resolve(ROLES);
  })
);
