
import { LIST_PERMISSIONS_OK, PERMISSIONS_NORMALIZED } from 'test/mocks/permissions';

import {
  getPermissions,
  getPermissionsIdList,
  getPermissionsMap,
  getPermissionsList,
} from 'state/permissions/selectors';

describe('state/permissions/selectors', () => {
  it('getPermissions(state) returns the permissions object', () => {
    const selected = getPermissions(PERMISSIONS_NORMALIZED);
    expect(selected).toBe(PERMISSIONS_NORMALIZED.permissions);
  });

  it('verify getRolesIdList selector', () => {
    expect(getPermissionsIdList(PERMISSIONS_NORMALIZED))
      .toEqual(PERMISSIONS_NORMALIZED.permissions.list);
  });

  it('verify getPermissionsMap selector', () => {
    expect(getPermissionsMap(PERMISSIONS_NORMALIZED))
      .toEqual(PERMISSIONS_NORMALIZED.permissions.map);
  });

  it('verify getPermissionsList selector', () => {
    expect(getPermissionsList(PERMISSIONS_NORMALIZED))
      .toEqual(LIST_PERMISSIONS_OK);
  });
});
