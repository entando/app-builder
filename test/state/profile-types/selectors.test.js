import {
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPES_NORMALIZED,
  PROFILE_TYPES_OPTIONS,
} from 'test/mocks/profileTypes';

import {
  getProfileTypes,
  getProfileTypesIdList,
  getProfileTypesMap,
  getProfileTypesList,
  getProfileTypesOptions,
} from 'state/profile-types/selectors';

describe('state/users/selectors', () => {
  it('getProfileTypes(state) returns the users object', () => {
    const selected = getProfileTypes(PROFILE_TYPES_NORMALIZED);
    expect(selected).toBe(PROFILE_TYPES_NORMALIZED.profileTypes);
  });

  it('verify getProfileTypesIdList selector', () => {
    expect(getProfileTypesIdList(PROFILE_TYPES_NORMALIZED))
      .toEqual(PROFILE_TYPES_NORMALIZED.profileTypes.list);
  });

  it('verify getProfileTypesMap selector', () => {
    expect(getProfileTypesMap(PROFILE_TYPES_NORMALIZED))
      .toEqual(PROFILE_TYPES_NORMALIZED.profileTypes.map);
  });

  it('verify getProfileTypeList selector', () => {
    expect(getProfileTypesList(PROFILE_TYPES_NORMALIZED))
      .toEqual(PROFILE_TYPES_OK_PAGE_1.payload);
  });

  it('verify getProfileTypesOptions selector', () => {
    expect(getProfileTypesOptions(PROFILE_TYPES_NORMALIZED))
      .toEqual(PROFILE_TYPES_OPTIONS);
  });
});
