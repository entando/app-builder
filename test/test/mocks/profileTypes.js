export const PROFILE_TYPE = {
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
};

const VALIDATION_RULES_DEFAULT = {
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
  ognlValidation: null,
};

export const PROFILE_TYPES = {

  name: 'firstProfileType',
  code: 'AAA',
  attributes: [],
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

export const ATTRIBUTE_COMPOSITE = {
  code: 'Indirizzo',
  type: 'Composite',
  name: 'Indirizzo',
  roles: [],
  disablingCodes: [],
  mandatory: false,
  listFilter: false,
  indexable: false,
  enumeratorStaticItems: null,
  enumeratorStaticItemsSeparator: null,
  enumeratorExtractorBean: null,
  validationRules: VALIDATION_RULES_DEFAULT,
  nestedAttribute: null,
  compositeAttributes: [
    {
      code: 'Via',
      type: 'Text',
      name: 'Via',
      roles: [],
      disablingCodes: [],
      mandatory: false,
      listFilter: false,
      indexable: false,
      enumeratorStaticItems: null,
      enumeratorStaticItemsSeparator: null,
      enumeratorExtractorBean: null,
      validationRules: VALIDATION_RULES_DEFAULT,
      nestedAttribute: null,
      compositeAttributes: null,
    },
    {
      code: 'Civico',
      type: 'Text',
      name: 'Civico',
      roles: [],
      disablingCodes: [],
      mandatory: true,
      listFilter: false,
      indexable: false,
      enumeratorStaticItems: null,
      enumeratorStaticItemsSeparator: null,
      enumeratorExtractorBean: null,
      validationRules: VALIDATION_RULES_DEFAULT,
      nestedAttribute: null,
      compositeAttributes: null,
    },
    {
      type: 'Text',
      code: 'strada',
      name: 'strada',
      roles: [],
      nestedAttribute: {
        code: 'strada',
        enumeratorStaticItems: 'default',
        enumeratorStaticItemsSeparator: ',',
      },
    },
  ],
};

export const ATTRIBUTE_MONOLIST_COMPOSITE = {
  code: 'mlstc',
  type: 'Monolist',
  name: 'Monolist Composite',
  roles: [],
  disablingCodes: [],
  mandatory: true,
  listFilter: false,
  indexable: false,
  enumeratorStaticItems: null,
  enumeratorStaticItemsSeparator: null,
  enumeratorExtractorBean: null,
  validationRules: VALIDATION_RULES_DEFAULT,
  nestedAttribute: {
    code: 'mlstc',
    type: 'Composite',
    name: null,
    roles: [],
    disablingCodes: [],
    mandatory: false,
    listFilter: false,
    indexable: false,
    enumeratorStaticItems: null,
    enumeratorStaticItemsSeparator: null,
    enumeratorExtractorBean: null,
    validationRules: VALIDATION_RULES_DEFAULT,
    nestedAttribute: null,
    compositeAttributes: [
      {
        code: 'testo',
        type: 'Text',
        name: 'testo',
        roles: [],
        disablingCodes: [],
        mandatory: true,
        listFilter: false,
        indexable: false,
        enumeratorStaticItems: null,
        enumeratorStaticItemsSeparator: null,
        enumeratorExtractorBean: null,
        validationRules: {
          ...VALIDATION_RULES_DEFAULT,
          minLength: 1,
          maxLength: 10,
        },
        nestedAttribute: null,
        compositeAttributes: null,
      },
      {
        code: 'number',
        type: 'Number',
        name: 'number',
        roles: [],
        disablingCodes: [],
        mandatory: false,
        listFilter: false,
        indexable: false,
        enumeratorStaticItems: null,
        enumeratorStaticItemsSeparator: null,
        enumeratorExtractorBean: null,
        validationRules: VALIDATION_RULES_DEFAULT,
        nestedAttribute: null,
        compositeAttributes: null,
      },
      {
        code: 'data',
        type: 'Date',
        name: 'data',
        roles: [],
        disablingCodes: [],
        mandatory: false,
        listFilter: false,
        indexable: false,
        enumeratorStaticItems: null,
        enumeratorStaticItemsSeparator: null,
        enumeratorExtractorBean: null,
        validationRules: {
          ...VALIDATION_RULES_DEFAULT,
          rangeStartDate: '2018-06-09 00:00:00',
          rangeEndDate: '2018-08-04 00:00:00',
        },
        nestedAttribute: null,
        compositeAttributes: null,
      },
      {
        code: 'CAG',
        type: 'Text',
        name: 'Cagliari',
        roles: [],
        disablingCodes: [],
        mandatory: false,
        listFilter: false,
        indexable: false,
        enumeratorStaticItems: null,
        enumeratorStaticItemsSeparator: null,
        enumeratorExtractorBean: null,
        validationRules: VALIDATION_RULES_DEFAULT,
        nestedAttribute: null,
        compositeAttributes: null,
      },
    ],
  },
  compositeAttributes: null,
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
