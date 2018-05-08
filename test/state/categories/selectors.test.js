
import {
  HOME_PAYLOAD,
  MYCATEGORY1_PAYLOAD,
  MYCATEGORY2_PAYLOAD,
  MYCATEGORY3_PAYLOAD,
  DATA_OBJECT_REFERENCES,
  CONTENT_REFERENCES,
  RESOURCE_REFERENCES,
} from 'test/mocks/categories';

import {
  getCategories,
  getCategoriesIdList,
  getCategoriesMap,
  getChildrenMap,
  getStatusMap,
  getTitlesMap,
  getCategoryTree,
  getSelected,
  getSelectedRefs,
  getReferenceKeyList,
  getReferenceMap,
} from 'state/categories/selectors';

const LOCALE_MOCK = 'en';
jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

const MOCK_STATE = {
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
    selected: {
      ...MYCATEGORY1_PAYLOAD,
      references: {
        jpcollaborationIdeaManager: false,
        DataObjectManager: false,
        jacmsResourceManager: false,
        jacmsContentManager: false,
      },
      referenceKeyList: [
        'jpcollaborationIdeaManager',
        'DataObjectManager',
        'jacmsResourceManager',
        'jacmsContentManager',
      ],
      referenceMap: {
        jpcollaborationIdeaManager: [],
        DataObjectManager: DATA_OBJECT_REFERENCES,
        jacmsResourceManager: RESOURCE_REFERENCES,
        jacmsContentManager: CONTENT_REFERENCES,
      },
    },
  },
};


describe('state/categories/selectors', () => {
  it('getCategories(state) returns the categories object', () => {
    const selected = getCategories(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.categories);
  });

  it('verify getGroupsIdList selector', () => {
    const selected = getCategoriesIdList(MOCK_STATE);
    expect(selected).toHaveLength(4);
    expect(selected[0]).toEqual('home');
  });

  it('getCategoriesMap(state) returns the categories map', () => {
    const selected = getCategoriesMap(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.categories.map);
  });

  it('getChildrenMap(state) returns the categories object', () => {
    const selected = getChildrenMap(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.categories.childrenMap);
  });

  it('getTitlesMap(state) returns the categories object', () => {
    const selected = getTitlesMap(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.categories.titlesMap);
  });

  it('getStatusMap(state) returns the categories object', () => {
    const selected = getStatusMap(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.categories.statusMap);
  });

  describe('getPageTreePages(state)', () => {
    let categoryTree;
    beforeEach(() => {
      categoryTree = getCategoryTree(MOCK_STATE);
    });

    it('only returns expanded rows and their children', () => {
      expect(categoryTree.length).toBe(4);
    });

    it('returns an array sorted by position', () => {
      expect(categoryTree[0].code).toBe('home');
      expect(categoryTree[1].code).toBe('mycategory1');
      expect(categoryTree[2].code).toBe('mycategory2');
      expect(categoryTree[3].code).toBe('mycategory3');
    });

    it('defines the depth property for each category', () => {
      expect(categoryTree[0].depth).toBe(0);
      expect(categoryTree[1].depth).toBe(1);
      expect(categoryTree[2].depth).toBe(1);
      expect(categoryTree[3].depth).toBe(1);
    });

    it('defines the isEmpty property for each category', () => {
      expect(categoryTree[0].isEmpty).toBe(false);
      expect(categoryTree[1].isEmpty).toBe(false);
      expect(categoryTree[2].isEmpty).toBe(true);
      expect(categoryTree[3].isEmpty).toBe(true);
    });

    it('defines the title property for each category', () => {
      expect(categoryTree[0].title).toBe(categoryTree[0].titles[LOCALE_MOCK]);
      expect(categoryTree[1].title).toBe(categoryTree[1].titles[LOCALE_MOCK]);
      expect(categoryTree[2].title).toBe(categoryTree[2].titles[LOCALE_MOCK]);
      expect(categoryTree[3].title).toBe(categoryTree[3].titles[LOCALE_MOCK]);
    });

    it('defines the expanded property for each category', () => {
      expect(categoryTree[0].expanded).toBe(true);
      expect(categoryTree[1].expanded).toBe(false);
      expect(categoryTree[2].expanded).toBe(false);
      expect(categoryTree[3].expanded).toBe(false);
    });

    it('defines the loading property for each category', () => {
      expect(categoryTree[0].loading).toBe(false);
      expect(categoryTree[1].loading).toBe(false);
      expect(categoryTree[2].loading).toBe(false);
      expect(categoryTree[3].loading).toBe(false);
    });

    it('defines the loaded property for each category', () => {
      expect(categoryTree[0].loaded).toBe(true);
      expect(categoryTree[1].loaded).toBe(false);
      expect(categoryTree[2].loaded).toBe(false);
      expect(categoryTree[3].loaded).toBe(false);
    });
  });

  describe('selected category', () => {
    it('getSelected(state)', () => {
      const selected = getSelected(MOCK_STATE);
      expect(selected).toBe(MOCK_STATE.categories.selected);
    });

    it('getSelectedRefs(state)', () => {
      const selected = getSelectedRefs(MOCK_STATE);
      expect(selected).toBe(MOCK_STATE.categories.selected.references);
    });

    it('getReferenceKeyList(state)', () => {
      const selected = getReferenceKeyList(MOCK_STATE);
      expect(selected).toHaveLength(4);
      expect(selected).toBe(MOCK_STATE.categories.selected.referenceKeyList);
    });

    it('getReferenceMap(state)', () => {
      const selected = getReferenceMap(MOCK_STATE);
      expect(selected).toHaveProperty('jpcollaborationIdeaManager');
      expect(selected).toHaveProperty('DataObjectManager');
      expect(selected).toHaveProperty('jacmsResourceManager');
      expect(selected).toHaveProperty('jacmsContentManager');
      expect(selected).toBe(MOCK_STATE.categories.selected.referenceMap);
    });
  });
});
