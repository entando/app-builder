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

const attributes = [
  {
    type: 'type',
    code: 'attrCode',
    name: 'attr name',
    status: '0',
    roles: [
      {
        code: 'firstCode',
        descr: 'firstCode',
      },
      {
        code: 'secondCode',
        descr: 'secondDescr',
      },
    ],
    disablingCodes: ['firstDisablingCode', 'secondDisablingCode'],
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
  },
];

// eslint-disable-next-line import/prefer-default-export
export const GET_CONTENT_TYPES_RESPONSE_OK = [
  {
    code: 'CNG',
    name: 'Generic Content',
    status: '0',
    attributes,
  },
  {
    code: 'NWS',
    name: 'News',
    status: '0',
    attributes,
  },
];
