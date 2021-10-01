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

export const GET_CONTENT_TYPE_RESPONSE_OK = {
  code: 'NWS',
  name: 'My News Content Type',
  status: '0',
  attributes,
  defaultContentModel: 'Full',
  defaultContentModelList: 'Full',
};

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

export const CONTENT_TYPES_OK_PAGE = {
  payload: [
    {
      name: 'contentType1',
      code: 'ABC',
      status: '0',
    },
    {
      name: 'contentType2',
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

export const CONTENT_TYPES_DELETE_OK = { code: '<contentTypeCode>' };

export const CONTENT_TYPES_ATTRIBUTES = ['Enumerator', 'Monotext', 'Text', 'List', 'Monolist'];

export const CONTENT_TYPE_ATTRIBUTE = {
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
  allowedRoles: [
    {
      code: 'roleCode1',
      descr: 'Role Descr 1',
    },
    {
      code: 'roleCode2',
      descr: 'Role Descr 2',
    },
  ],
  allowedDisablingCodes: [
    {
      code: 'Code1',
      descr: 'Description 1',
    },
    {
      code: 'Code2',
      descr: 'Description 2',
    },
  ],
};

export const CONTENT_TYPE_REFERENCES_STATUS = {
  ready: ['AAA', 'BBB'],
  toRefresh: ['CCC'],
  refreshing: [],
};

export const CONTENT_TYPE_RELOAD_REFERENCES_STATUS = {
  result: 'success',
  contentTypeCodes: {
    AAA: 0,
    BBB: 1,
  },
};

export const ATTRIBUTE_CONTENT_TYPES_DELETE_OK = {
  contentTypeCode: 'contentTypeCode',
  attributeCode: 'attributeCode',
};

export const ATTRIBUTE_MOVE_UP = {
  attributeCode: 'title',
  contentTypeCode: 'DTT',
  movement: 'UP',
};

export const ATTRIBUTE_MOVE_DOWN = {
  attributeCode: 'title',
  contentTypeCode: 'DTT',
  movement: 'DOWN',
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

export const COMPOSITE_ATTRIBUTE_VALUESONLY = {
  code: 'Author',
  type: 'Composite',
  name: 'Author',
  names: {
    en: 'Author',
  },
  nestedAttribute: null,
  compositeAttributes: [
    {
      code: 'AuthorName',
      type: 'Text',
      name: 'AuthorName',
      names: {
        en: 'AuthorName',
      },
      nestedAttribute: null,
      compositeAttributes: null,
    },
    {
      code: 'AuthorFace',
      type: 'Image',
      name: 'AuthorFace',
      names: {
        en: 'AuthorFace',
      },
      nestedAttribute: null,
      compositeAttributes: null,
    },
  ],
};

export const MONOLIST_COMPOSITE_ATTRIBUTE_VALUESONLY = {
  code: 'Authors',
  type: 'Monolist',
  name: 'Authors',
  names: {
    en: 'Authors',
  },
  nestedAttribute: { ...COMPOSITE_ATTRIBUTE_VALUESONLY, code: 'Authors' },
  compositeAttributes: null,
};

export const GET_GROUPS_RESPONSE_OK = {
  payload: [
    {
      name: 'Administrators',
      code: 'administrators',
    },
    {
      name: 'groupName',
      code: 'groupCode',
    },
  ],
  errors: [],
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 10,
  },
};

export const GET_CATEGORIES_RESPONSE_OK = {
  payload: [
    {
      code: 'code',
      parentCode: 'parentCode',
      titles: {
        it: 'Mio Titolo',
        en: 'My title',
      },
      children: ['categoryCode1', 'categoryCode2'],
    },
  ],
  errors: [],
  metaData: {
    parentCode: 'service',
  },
};

export const NEWS_CTYPE = {
  code: 'NWS',
  name: 'News',
  status: '0',
  attributes: [
    {
      code: 'title',
      type: 'Text',
      name: null,
      names: {
        en: 'title',
      },
      nestedAttribute: null,
      compositeAttributes: null,
    },
    {
      code: 'body',
      type: 'Hypertext',
      name: 'Main Body',
      names: {
        en: 'body',
      },
      nestedAttribute: null,
      compositeAttributes: null,
    },
    {
      code: 'image',
      type: 'Image',
      name: null,
      names: {
        en: 'image',
      },
      roles: [],
      disablingCodes: [],
      nestedAttribute: null,
      compositeAttributes: null,
    },
    {
      code: 'link',
      type: 'Link',
      name: 'Link',
      names: {
        en: 'link',
      },
      nestedAttribute: null,
      compositeAttributes: null,
    },
    { ...MONOLIST_COMPOSITE_ATTRIBUTE_VALUESONLY },
    { ...COMPOSITE_ATTRIBUTE_VALUESONLY },
    {
      code: 'Emails',
      type: 'List',
      name: 'Emails',
      names: {
        en: 'Emails',
      },
      nestedAttribute: {
        code: 'Emails',
        type: 'Email',
        name: 'Emails',
        names: {
          en: 'Emails',
        },
        nestedAttribute: null,
        compositeAttributes: null,
      },
      compositeAttributes: null,
    },
  ],
};
