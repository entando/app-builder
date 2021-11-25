import {
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPE_ATTRIBUTE,
  PROFILE_TYPES_ATTRIBUTES,
  ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'test/mocks/profileTypes';

import {
  getProfileTypes,
  getProfileTypesIdList,
  getProfileTypesMap,
  getProfileTypeList,
  getSelectedProfileType,
  getProfileTypeAttributes,
  getProfileTypeAttributesIdList,
  getProfileTypeSelectedAttributeType,
  getSelectedCompositeAttributes,
  getProfileTypeSelectedAttributeSearchable,
  getProfileTypeSelectedAttributeIndexable,
  getProfileTypeSelectedAttributeAllowedRoles,
  getProfileTypeSelectedAttributeallowedDisablingCodes,
  getMonolistAttributeType,
  getIsMonolistCompositeAttributeType,
  getNewAttributeComposite,
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

const TEST_STATE_HAS_BLANKSELECTED = {
  profileTypes: {
    list: PROFILE_TYPES_OK_PAGE_1,
    selected: {},
    attributes: {
      list: PROFILE_TYPES_ATTRIBUTES,
      selected: PROFILE_TYPE_ATTRIBUTE,
    },
  },
};

const STATE_ATTRIBUTES_MONOLIST = {
  profileTypes: {
    selected: {
      attributes: 'ey',
      attributeSelected: ATTRIBUTE_MONOLIST_COMPOSITE,
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
  it('verify getProfileTypeAttributesIdList returning list except selected attribute', () => {
    const LIST_SELECTED = { ...TEST_STATE_HAS_BLANKSELECTED };
    LIST_SELECTED.profileTypes.attributes.selected = { code: 'List' };
    expect(getProfileTypeAttributesIdList(LIST_SELECTED)).toEqual(['Enumerator', 'Monotext', 'Text']);
  });
  it('verify getProfileTypeSelectedAttributeType selector is defined', () => {
    expect(getProfileTypeSelectedAttributeType(STATE_ATTRIBUTES)).toBeDefined();
  });
  it('verify getSelectedCompositeAttributes selector is defined', () => {
    expect(getSelectedCompositeAttributes(TEST_STATE_HAS_BLANKSELECTED)).toEqual([]);
    expect(getSelectedCompositeAttributes(STATE_ATTRIBUTES_MONOLIST)[0])
      .toEqual(ATTRIBUTE_MONOLIST_COMPOSITE.nestedAttribute.compositeAttributes[0]);
    const noCompAttr = {
      profileTypes: {
        selected: {
          attributes: 'ey',
          attributeSelected: {
            code: 'mlstc',
            type: 'Monolist',
            name: 'Monolist Composite',
            nestedAttribute: {
              code: 'mlstc',
              type: 'Text',
              nestedAttribute: null,
              compositeAttributes: null,
            },
          },
        },
      },
    };
    expect(getSelectedCompositeAttributes(noCompAttr)).toEqual([]);
  });
  it('test #2 on verifying getProfileTypeAttributesIdList returning list except selected attribute', () => {
    const LIST_SELECTED2 = {
      profileTypes: {
        list: PROFILE_TYPES_OK_PAGE_1,
        selected: {},
        attributes: {
          list: PROFILE_TYPES_ATTRIBUTES,
          selected: { code: 'Monolist' },
        },
      },
    };
    const res = getProfileTypeAttributesIdList(LIST_SELECTED2);
    expect(res).toEqual(['Enumerator', 'Monotext', 'Text']);
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
  it('verify getMonolistAttributeType', () => {
    const LIST_SELECTED3 = {
      profileTypes: {
        list: PROFILE_TYPES_OK_PAGE_1,
        selected: {
          attributeSelected: ATTRIBUTE_MONOLIST_COMPOSITE,
        },
      },
    };
    const res = getMonolistAttributeType(LIST_SELECTED3);
    expect(res).toEqual('Composite');

    const LIST_SELECTED4 = {
      profileTypes: {
        list: [],
        selected: {
          attributeSelected: {
            code: 'mlstc',
            type: 'Monolist',
            name: 'Monolist Composite',
            nestedAttribute: {
              code: 'mlstc',
              type: '',
              nestedAttribute: {},
              compositeAttributes: null,
            },
          },
        },
      },
    };

    const res2 = getMonolistAttributeType(LIST_SELECTED4);
    expect(res2).toEqual('');
  });

  it('verify getIsMonolistCompositeAttributeType', () => {
    const res = getIsMonolistCompositeAttributeType(STATE_ATTRIBUTES_MONOLIST);
    expect(res).toEqual(true);
  });

  it('verify getNewAttributeComposite', () => {
    const LIST_SELECTED4 = {
      profileTypes: {
        list: PROFILE_TYPES_OK_PAGE_1,
        selected: { newAttributeComposite: 'boi' },
      },
    };
    const res = getNewAttributeComposite(LIST_SELECTED4);
    expect(res).toEqual('boi');
  });
});
