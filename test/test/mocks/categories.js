export const HOME_PAYLOAD = {
  code: 'home',
  parentCode: null,
  titles: {
    it: 'Tutte',
    en: 'All',
  },
  children: [
    'mycategory1',
    'mycategory2',
    'mycategory3',
  ],
};

export const MYCATEGORY1_PAYLOAD = {
  code: 'mycategory1',
  parentCode: 'home',
  titles: {
    it: 'Mia Categoria 1',
    en: 'My Category 1',
  },
  children: [
    'subcategory',
  ],
};

export const MYCATEGORY2_PAYLOAD = {
  code: 'mycategory2',
  parentCode: 'home',
  titles: {
    it: 'Mia Categoria 2',
    en: 'My Category 2',
  },
  children: [],
};

export const MYCATEGORY3_PAYLOAD = {
  code: 'mycategory3',
  parentCode: 'home',
  titles: {
    it: 'Mia Categoria 3',
    en: 'My Category 3',
  },
  children: [],
};

export const SUBCATEGORY_PAYLOAD = {
  code: 'subcategory',
  parentCode: 'mycategory1',
  titles: {
    it: 'Sotto categoria',
    en: 'Subcategory',
  },
  children: [],
};

export const CATEGORY_TREE_MYCATEGORY1 = [
  MYCATEGORY1_PAYLOAD,
  SUBCATEGORY_PAYLOAD,
];

export const CATEGORY_TREE_HOME = [
  HOME_PAYLOAD,
  MYCATEGORY1_PAYLOAD,
  MYCATEGORY2_PAYLOAD,
  MYCATEGORY3_PAYLOAD,
];

export const CATEGORY_TREE = {
  home: CATEGORY_TREE_HOME,
  mycategory1: CATEGORY_TREE_MYCATEGORY1,
};


export const BODY_ERROR = {
  payload: [],
  errors: [
    {
      code: '1',
      message: 'what went wrong',
    },
  ],
  metaData: {
    parentCode: 'service',
  },
};
