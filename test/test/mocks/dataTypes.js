export const DATA_TYPES = {
  payload: [{
    name: 'dataType1',
    code: 'XYZ',
    status: 'ok',
  }],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 100,
    lastPage: 10,
  },
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
      status: 'ok',
    },
    {
      name: 'dataType2',
      code: 'DEF',
      status: 'ok',
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
      status: 'ok',
    },
    {
      name: 'dataType4',
      code: 'LMN',
      status: 'ok',
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
  'Enumeraror',
  'Monotext',
  'Text',
];

export const DATA_TYPE_ATTRIBUTE = {
  code: 'myCode',
  multilingual: false,
  textAttribute: false,
  simple: false,
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

export const DATA_TYPE_GET_PAYLOAD = {
  payload: {
    name: 'firstDataType',
    code: 'AAA',
    status: '0',
    attributes: [
      {
        type: 'Boolean',
        code: 'bool',
        name: 'Boolean',
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
            helpMessage: 'help',
            keyForHelpMessage: 'helpKey',
            errorMessage: 'errorMsg',
            keyForErrorMessage: 'keyForError',
          },
          minLength: 10,
          maxLength: 100,
          regex: 'regex*',
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
      },
      {
        type: 'Checkbox',
        code: 'checkbox',
        name: 'Checkbox',
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
            helpMessage: 'help',
            keyForHelpMessage: 'helpKey',
            errorMessage: 'errorMsg',
            keyForErrorMessage: 'keyForError',
          },
          minLength: 10,
          maxLength: 100,
          regex: 'regex*',
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
      },
    ],
    viewPage: null,
    listModel: null,
    defaultModel: null,
  },
  errors: [],
  metaData: {},
};
