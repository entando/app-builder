import { ROLES } from 'test/mocks/roles';

// eslint-disable-next-line import/prefer-default-export
export const getApiRoles = () => (
  new Promise((resolve) => {
    resolve(ROLES);
  })
);
