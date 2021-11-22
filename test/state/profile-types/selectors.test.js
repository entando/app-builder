import { PROFILE_TYPES_OK_PAGE_1 } from 'test/mocks/profileTypes';

import {
  getProfileTypes,
  getProfileTypesIdList,
  getProfileTypesMap,
  getProfileTypeList,
  getSelectedProfileType,
  getProfileTypeAttributes,
  getProfileTypeAttributesIdList,
  getProfileTypeSelectedAttributeType,
  getProfileTypeSelectedAttributeSearchable,
  getProfileTypeSelectedAttributeIndexable,
  getProfileTypeSelectedAttributeAllowedRoles,
  getProfileTypeSelectedAttributeallowedDisablingCodes,
} from 'state/profile-types/selectors';

const TEST_STATE = {
  profileTypes: {
    list: ['ABC', 'DEF'],
    map: {
      ABC: {
        name: 'profileType1',
        code: 'ABC',
        status: '0',
      },
      DEF: {
        name: 'profileType2',
        code: 'DEF',
        status: '0',
      },
    },
    attributes: {
    },
  },
  pagination: PROFILE_TYPES_OK_PAGE_1.metaData,
};

const STATE_ATTRIBUTES = {
  profileTypes: {
    attributes: {
      list: [],
      selected: {
        listAttribute: [],
        searchableOptionSupported: [],
        indexableOptionSupported: [],
        allowedRoles: [],
        allowedDisablingCodes: [],

      },
    },
  },
};

const STATE_ATTRIBUTES_NO_LIST = {
  profileTypes: {
    selected: {
      attributeSelected: {},
    },
    attributes: {
      selected: {},
    },
  },
};

describe('state/users/selectors', () => {
  it('getProfileTypes(state) returns the users object', () => {
    const selected = getProfileTypes(TEST_STATE);
    expect(selected).toBe(TEST_STATE.profileTypes);
  });

  it('verify getProfileTypesIdList selector', () => {
    expect(getProfileTypesIdList(TEST_STATE)).toEqual(TEST_STATE.profileTypes.list);
  });

  it('verify getProfileTypesMap selector', () => {
    expect(getProfileTypesMap(TEST_STATE)).toEqual(TEST_STATE.profileTypes.map);
  });

  it('verify getProfileTypeList selector', () => {
    expect(getProfileTypeList(TEST_STATE)).toEqual(PROFILE_TYPES_OK_PAGE_1.payload);
  });

  it('verify getSelectedProfileType selector is undefined', () => {
    expect(getSelectedProfileType(TEST_STATE)).toBeUndefined();
  });

  it('verify getSelectedProfileType selector is defined', () => {
    expect(getSelectedProfileType({ profileTypes: { selected: {} } })).toBeDefined();
  });

  it('verify getProfileTypeAttributes selector is defined', () => {
    expect(getProfileTypeAttributes(TEST_STATE)).toBeDefined();
  });
  it('verify getProfileTypeAttributesIdList selector is undefined', () => {
    expect(getProfileTypeAttributesIdList(STATE_ATTRIBUTES_NO_LIST)).toBeUndefined();
  });
  it('verify getProfileTypeAttributesIdList selector is defined', () => {
    expect(getProfileTypeAttributesIdList(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getProfileTypeSelectedAttributeType selector is defined', () => {
    expect(getProfileTypeSelectedAttributeType(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getProfileTypeSelectedAttributeSearchable selector is defined', () => {
    expect(getProfileTypeSelectedAttributeSearchable(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getProfileTypeSelectedAttributeIndexable selector is defined', () => {
    expect(getProfileTypeSelectedAttributeIndexable(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getProfileTypeSelectedAttributeAllowedRoles selector is defined', () => {
    expect(getProfileTypeSelectedAttributeAllowedRoles(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getProfileTypeSelectedAttributeallowedDisablingCodes selector is defined', () => {
    expect(getProfileTypeSelectedAttributeallowedDisablingCodes(STATE_ATTRIBUTES)).toBeDefined();
  });
});
