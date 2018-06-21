export const PROFILE_TYPES = {

  name: 'firstProfileType',
  code: 'AAA',
  attributes: [{
    type: 'type',
    code: 'attrCode',
    name: 'attr name',
    status: '0',
    roles: [{
      code: 'firstCode',
      descr: 'firstCode',
    }, {
      code: 'secondCode',
      descr: 'secondDescr',
    }],
    disablingCodes: [
      'firstDisablingCode',
      'secondDisablingCode',
    ],
    mandatory: true,
    listFilter: true,
    indexable: true,
    enumeratorStaticItems: null,
    enumeratorStaticItemsSeparator: null,
    enumeratorExtractorBean: null,
    validationRules: {
      ognlValidation: {
        ognlExpression: 'expression',
        applyOnlyToFilledAttr: false,
        helpMessage: 'Help message',
        keyForHelpMessage: null,
        errorMessage: 'Error Message',
        keyForErrorMessage: null,
      },
      minLength: null,
      maxLength: null,
      regex: null,
      rangeStartString: null,
      rangeEndString: null,
      rangeStartStringAttribute: null,
      rangeEndStringAttribute: null,
      equalString: null,
      equalStringAttribute: null,
      rangeStartDate: null,
      rangeEndDate: null,
      rangeStartDateAttribute: null,
      rangeEndDateAttribute: null,
      equalDate: null,
      equalDateAttribute: null,
      rangeStartNumber: null,
      rangeStartNumberAttribute: null,
      rangeEndNumber: null,
      rangeEndNumberAttribute: null,
      equalNumber: null,
      equalNumberAttribute: null,
    },
    nestedAttribute: null,
    compositeAttributes: null,
  }],
  viewPage: null,
  listModel: null,
  defaultModel: null,

};

export const PROFILE_TYPES_DELETE_OK = { code: '<profileTypeCode>' };
export const ATTRIBUTE_PROFILE_TYPES_DELETE_OK = {
  profileTypeCode: 'profileTypeCode',
  attributeCode: 'attributeCode',
};

export const ERROR = {
  payload: [],
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {
    page: 1,
    pageSize: 100,
    lastPage: 10,
  },
};

export const PROFILE_TYPES_OK_PAGE_1 =
{
  payload: [
    {
      name: 'profileType1',
      code: 'ABC',
      status: '0',
    },
    {
      name: 'profileType2',
      code: 'DEF',
      status: '0',
    },
  ],
  errors: [],
};

export const PROFILE_TYPES_OK_PAGE_2 =
{
  payload: [
    {
      name: 'profileType3',
      code: 'GHI',
      status: '0',
    },
    {
      name: 'profileType4',
      code: 'LMN',
      status: '0',
    },
  ],
  errors: [],
};
export const PROFILE_TYPES_ATTRIBUTES = [
  'Enumerator',
  'Monotext',
  'Text',
];

export const PROFILE_TYPE_ATTRIBUTE = {
  code: 'Monotext',
  multilingual: false,
  textAttribute: false,
  simple: false,
  searchableOptionSupported: true,
  indexableOptionSupported: false,
  textFilterSupported: true,
  dateFilterSupported: false,
  numberFilterSupported: false,
  enumeratorOptionsSupported: false,
  enumeratorMapOptionsSupported: false,
  listAttribute: false,
  enumeratorExtractorBeans: [],
  enumeratorMapExtractorBeans: [],
  allowedRoles: [{
    code: 'roleCode1',
    descr: 'Role Descr 1',
  }, {
    code: 'roleCode2',
    descr: 'Role Descr 2',
  }],
  allowedDisablingCodes: [{
    code: 'Code1',
    descr: 'Description 1',
  }, {
    code: 'Code2',
    descr: 'Description 2',
  }],
};

export const PROFILE_TYPES_NORMALIZED = {
  profileTypes: {
    list: ['PFL', 'SUP'],
    map: {
      PFL: {
        name: 'Default User Profile',
        code: 'PFL',
        status: '0',
      },
      SUP: {
        name: 'Supervisor User Profile',
        code: 'SUP',
        status: 'ko',
      },
    },
  },
  pagination: PROFILE_TYPES_OK_PAGE_1.metaData,
};

export const PROFILE_TYPES_OPTIONS = [
  {
    text: 'Default User Profile',
    value: 'PFL',
  },
  {
    text: 'Supervisor User Profile',
    value: 'SUP',
  },
];

export const ATTRIBUTE_MOVE_UP = {
  attributeCode: 'title',
  profileTypeCode: 'PFT',
  movement: 'UP',
};

export const ATTRIBUTE_MOVE_DOWN = {
  attributeCode: 'title',
  profileTypeCode: 'PFT',
  movement: 'DOWN',
};

export const PROFILE_TYPE_REFERENCES_STATUS = {
  ready: [
    'AAA',
    'BBB',
  ],
  toRefresh: [
    'CCC',
  ],
  refreshing: [],
};

export const PROFILE_TYPE_RELOAD_REFERENCES_STATUS = {
  result: 'success',
  profileTypeCodes: {
    AAA: 0,
    BBB: 1,
  },
};
