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

export const STATE_NORMALIZED = {
  categories: {
    list: ['home', 'mycategory1', 'mycategory2', 'mycategory3'],
    map: {
      home: HOME_PAYLOAD,
      mycategory1: MYCATEGORY1_PAYLOAD,
      mycategory2: MYCATEGORY2_PAYLOAD,
      mycategory3: MYCATEGORY3_PAYLOAD,
    },
    childrenMap: {
      home: HOME_PAYLOAD.children,
      mycategory1: MYCATEGORY1_PAYLOAD.children,
      mycategory2: MYCATEGORY2_PAYLOAD.children,
      mycategory3: MYCATEGORY3_PAYLOAD.children,
    },
    titlesMap: {
      home: HOME_PAYLOAD.titles,
      mycategory1: MYCATEGORY1_PAYLOAD.titles,
      mycategory2: MYCATEGORY2_PAYLOAD.titles,
      mycategory3: MYCATEGORY3_PAYLOAD.titles,
    },
    statusMap: {
      home: { expanded: true, loading: false, loaded: true },
      mycategory1: {},
      mycategory2: {},
      mycategory3: {},
    },
  },
  loading: { categories: false },
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
