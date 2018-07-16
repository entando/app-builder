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

export const DATA_TYPES = {

  name: 'firstDataType',
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
      ...VALIDATION_RULES_DEFAULT,
      ognlValidation: {
        ognlExpression: 'expression',
        applyOnlyToFilledAttr: false,
        helpMessage: 'Help message',
        keyForHelpMessage: null,
        errorMessage: 'Error Message',
        keyForErrorMessage: null,
      },
    },
    nestedAttribute: null,
    compositeAttributes: [],
  }],
  viewPage: null,
  listModel: null,
  defaultModel: null,

};

export const DATA_TYPES_DELETE_OK = { code: '<dataTypeCode>' };
export const ATTRIBUTE_DATA_TYPES_DELETE_OK = {
  dataTypeCode: 'dataTypeCode',
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

export const DATA_TYPES_OK_PAGE_1 =
{
  payload: [
    {
      name: 'dataType1',
      code: 'ABC',
      status: '0',
    },
    {
      name: 'dataType2',
      code: 'DEF',
      status: '0',
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 2,
    totalItems: 20,
  },
};

export const DATA_TYPES_OK_PAGE_2 =
{
  payload: [
    {
      name: 'dataType3',
      code: 'GHI',
      status: '0',
    },
    {
      name: 'dataType4',
      code: 'LMN',
      status: '0',
    },
  ],
  errors: [],
  metaData: {
    page: 2,
    pageSize: 2,
    lastPage: 2,
    totalItems: 4,
  },
};
export const DATA_TYPES_ATTRIBUTES = [
  'Enumerator',
  'Monotext',
  'Text',
];

export const DATA_TYPE_ATTRIBUTE = {
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

export const ATTRIBUTE_MOVE_UP = {
  attributeCode: 'title',
  dataTypeCode: 'DTT',
  movement: 'UP',
};

export const ATTRIBUTE_MOVE_DOWN = {
  attributeCode: 'title',
  dataTypeCode: 'DTT',
  movement: 'DOWN',
};

export const DATA_TYPE_REFERENCES_STATUS = {
  ready: [
    'AAA',
    'BBB',
  ],
  toRefresh: [
    'CCC',
  ],
  refreshing: [],
};

export const DATA_TYPE_RELOAD_REFERENCES_STATUS = {
  result: 'success',
  dataTypeCodes: {
    AAA: 0,
    BBB: 1,
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
  compositeAttributes: [{
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
  }, {
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
  }, {
    type: 'Text',
    code: 'strada',
    name: 'strada',
    roles: [],
    nestedAttribute: {
      code: 'strada',
      enumeratorStaticItems: 'default',
      enumeratorStaticItemsSeparator: ',',
    },
  }],
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
    compositeAttributes: [{
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
    }, {
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
    }, {
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
    }, {
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
    }],
  },
  compositeAttributes: null,
};
