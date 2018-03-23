
import { LIST_ROLES_OK, ROLES_NORMALIZED } from 'test/mocks/roles';

import {
  getRoles,
  getRolesIdList,
  getRolesMap,
  getRolesList,
} from 'state/roles/selectors';

describe('state/roles/selectors', () => {
  it('getRoles(state) returns the roles object', () => {
    const selected = getRoles(ROLES_NORMALIZED);
    expect(selected).toBe(ROLES_NORMALIZED.roles);
  });

  it('verify getRolesIdList selector', () => {
    expect(getRolesIdList(ROLES_NORMALIZED)).toEqual(ROLES_NORMALIZED.roles.list);
  });

  it('verify getRolesMap selector', () => {
    expect(getRolesMap(ROLES_NORMALIZED)).toEqual(ROLES_NORMALIZED.roles.map);
  });

  it('verify getUserList selector', () => {
    expect(getRolesList(ROLES_NORMALIZED)).toEqual(LIST_ROLES_OK);
  });
});
