import { cloneDeep } from 'lodash';

import {
  getGroupedWidgetList, filterWidgetList, getViewList, getSearchFilter, getPageConfig,
  getConfigMap, makeGetPageConfigCellMap, getToolbarExpanded, getContent, makeGetSelectedPageConfig,
  makeGetSelectedPagePublishedConfig, makeGetPageIsOnTheFly,
  makeGetSelectedPageDiffersFromPublished, makeGetSelectedPageConfigMatchesDefault,
} from 'state/page-config/selectors';
import { WIDGET_LIST, WIDGET, WIDGET_ONE_LIST, WIDGETS_MAP } from 'test/mocks/widgets';
import { getListWidget, getWidgetsMap } from 'state/widgets/selectors';
import { getLocale } from 'state/locale/selectors';
import {
  getSelectedPageModelCellMap,
  getSelectedPageModelMainFrame,
  getSelectedPageModelDefaultConfig,
} from 'state/page-models/selectors';
import { CELL_MAP } from 'test/mocks/page-models/complex';
import { HOMEPAGE_CONFIG } from 'test/mocks/pageConfig';
import { WIDGET_STATUS_MATCH, WIDGET_STATUS_DIFF, WIDGET_STATUS_REMOVED } from 'state/page-config/const';


jest.mock('state/page-models/selectors', () => ({
  getSelectedPageModelCellMap: jest.fn(),
  getSelectedPageModelMainFrame: jest.fn(),
  getSelectedPageModelDefaultConfig: jest.fn(),
}));

jest.mock('state/widgets/selectors', () => ({
  getListWidget: jest.fn(),
  getWidgetsMap: jest.fn(),
}));

jest.mock('state/locale/selectors', () => ({
  getLocale: jest.fn(),
}));

const buildModifiedConfig = (config) => {
  const newConfig = [...config];
  const firstNullIndex = newConfig.findIndex(item => item === null);
  const firstNotNullIndex = newConfig.findIndex(item => item !== null);
  newConfig[firstNullIndex] = newConfig[firstNotNullIndex];
  newConfig[firstNotNullIndex] = null;
  return newConfig;
};

const CURRENT_PAGE_CODE = 'homepage';
const CURRENT_LOCALE = 'en';
const HOMEPAGE_PUBLISHED_CONFIG = HOMEPAGE_CONFIG;
const HOMEPAGE_DRAFT_CONFIG = buildModifiedConfig(HOMEPAGE_CONFIG);


const MOCK_DATA = {
  content: 'WIDGET_LIST',
  searchFilter: 'My',
  viewList: 'list',
  toolbarExpanded: true,
  configMap: {
    [CURRENT_PAGE_CODE]: HOMEPAGE_DRAFT_CONFIG,
  },
  publishedConfigMap: {
    [CURRENT_PAGE_CODE]: HOMEPAGE_PUBLISHED_CONFIG,
  },
};
let MOCK_STATE;

describe('state/page-config/selectors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    getListWidget.mockImplementation(() => WIDGET_LIST.payload);
    getWidgetsMap.mockReturnValue(WIDGETS_MAP);
    getLocale.mockReturnValue(CURRENT_LOCALE);
    MOCK_STATE = {
      pageConfig: cloneDeep(MOCK_DATA),
    };
  });

  it('getPageConfig(state) return a pageConfig object', () => {
    const pageConfig = getPageConfig(MOCK_STATE);
    expect(pageConfig).toMatchObject(MOCK_STATE.pageConfig);
  });

  it('verify getSearchFilter selector', () => {
    expect(getSearchFilter(MOCK_STATE)).toEqual(MOCK_DATA.searchFilter);
  });

  it('verify getViewList selector', () => {
    expect(getViewList(MOCK_STATE)).toEqual(MOCK_DATA.viewList);
  });

  it('verify filterWidgetList selector', () => {
    expect(filterWidgetList(MOCK_STATE)).toEqual([WIDGET]);
  });

  it('verify getGroupedWidgetList selector', () => {
    expect(getGroupedWidgetList(MOCK_STATE)).toMatchObject(WIDGET_ONE_LIST);
  });

  it('verify getConfigMap selector', () => {
    expect(getConfigMap(MOCK_STATE)).toEqual(MOCK_DATA.configMap);
  });

  it('verify getToolbarExpanded selector', () => {
    expect(getToolbarExpanded(MOCK_STATE)).toEqual(MOCK_DATA.toolbarExpanded);
  });

  it('verify getContent selector', () => {
    expect(getContent(MOCK_STATE)).toEqual(MOCK_DATA.content);
  });

  describe('makeGetSelectedPageConfig', () => {
    it('when there is a page config for the current pageCode', () => {
      expect(makeGetSelectedPageConfig(CURRENT_PAGE_CODE)(MOCK_STATE))
        .toEqual(MOCK_DATA.configMap[CURRENT_PAGE_CODE]);
    });

    it('when there is NOT a page config for the current pageCode', () => {
      expect(makeGetSelectedPageConfig('some_other_code')(MOCK_STATE)).toBe(null);
    });
  });

  describe('makeGetSelectedPagePublishedConfig', () => {
    it('when there is a page config for the current pageCode', () => {
      expect(makeGetSelectedPagePublishedConfig(CURRENT_PAGE_CODE)(MOCK_STATE))
        .toEqual(MOCK_DATA.publishedConfigMap[CURRENT_PAGE_CODE]);
    });

    it('when there is NOT a page config for the current pageCode', () => {
      expect(makeGetSelectedPagePublishedConfig('some_other_code')(MOCK_STATE)).toBe(null);
    });
  });

  describe('makeGetPageConfigCellMap', () => {
    beforeEach(() => {
      getSelectedPageModelCellMap.mockReturnValue(CELL_MAP);
    });

    it('verify makeGetPageConfigCellMap selector', () => {
      const configCellMap = makeGetPageConfigCellMap({ pageCode: CURRENT_PAGE_CODE })(MOCK_STATE);
      Object.keys(configCellMap).forEach((cellKey) => {
        const cell = configCellMap[cellKey];
        const draftItem = HOMEPAGE_DRAFT_CONFIG[cell.framePos];
        const publishedItem = HOMEPAGE_PUBLISHED_CONFIG[cell.framePos];
        if (draftItem || publishedItem) {
          const item = draftItem || publishedItem;
          expect(cell.widgetCode).toBe(item.code);
          expect(cell.widgetTitle).toBe(WIDGETS_MAP[item.code].titles[CURRENT_LOCALE]);
          expect(cell.widgetHasConfig).toBe(!!item.config);
        }

        if (draftItem && publishedItem) {
          expect(cell.widgetStatus).toBe(WIDGET_STATUS_MATCH);
        } else if (draftItem && !publishedItem) {
          expect(cell.widgetStatus).toBe(WIDGET_STATUS_DIFF);
        } else if (!draftItem && publishedItem) {
          expect(cell.widgetStatus).toBe(WIDGET_STATUS_REMOVED);
        } else {
          expect(cell.widgetCode).toBeUndefined();
          expect(cell.widgetTitle).toBeUndefined();
          expect(cell.widgetHasConfig).toBeUndefined();
          expect(cell.widgetStatus).toBeUndefined();
        }
      });
    });

    it('if no page is selected, returns null', () => {
      expect(makeGetPageConfigCellMap({ pageCode: null })(MOCK_STATE)).toEqual(null);
    });
  });

  describe('makeGetPageIsOnTheFly', () => {
    const MAIN_FRAME_POS = 3;
    beforeEach(() => {
      getSelectedPageModelMainFrame.mockReturnValue({ pos: MAIN_FRAME_POS });
    });

    it('returns true if the config has a "content_viewer" with no config in the main frame', () => {
      MOCK_STATE.pageConfig.configMap[CURRENT_PAGE_CODE][MAIN_FRAME_POS] =
        { code: 'content_viewer' };
      expect(makeGetPageIsOnTheFly(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(true);
    });

    it('returns false if the config has a "content_viewer" with config in the main frame', () => {
      MOCK_STATE.pageConfig.configMap[CURRENT_PAGE_CODE][MAIN_FRAME_POS] =
        { code: 'content_viewer', config: {} };
      expect(makeGetPageIsOnTheFly(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(false);
    });

    it('returns false if there is no main frame on the selected page model', () => {
      getSelectedPageModelMainFrame.mockReturnValue(null);
      MOCK_STATE.pageConfig.configMap[CURRENT_PAGE_CODE][MAIN_FRAME_POS] =
        { code: 'content_viewer', config: {} };
      expect(makeGetPageIsOnTheFly(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(false);
    });

    it('returns false if there is no config for the current page code', () => {
      MOCK_STATE.pageConfig.configMap[CURRENT_PAGE_CODE] = null;
      expect(makeGetPageIsOnTheFly(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(false);
    });
  });

  describe('makeGetSelectedPageDiffersFromPublished', () => {
    it('returns false if the draft and published configs are equal', () => {
      MOCK_STATE.pageConfig.configMap[CURRENT_PAGE_CODE] =
        MOCK_STATE.pageConfig.publishedConfigMap[CURRENT_PAGE_CODE];
      expect(makeGetSelectedPageDiffersFromPublished(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(false);
    });

    it('returns false if the draft config is null', () => {
      MOCK_STATE.pageConfig.configMap[CURRENT_PAGE_CODE] = null;
      expect(makeGetSelectedPageDiffersFromPublished(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(false);
    });

    it('returns false if the published config is null', () => {
      MOCK_STATE.pageConfig.publishedConfigMap[CURRENT_PAGE_CODE] = null;
      expect(makeGetSelectedPageDiffersFromPublished(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(false);
    });

    it('returns true if the draft and published configs are different', () => {
      expect(makeGetSelectedPageDiffersFromPublished(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(true);
    });
  });

  describe('makeGetSelectedPageConfigMatchesDefault', () => {
    it('returns true if the draft and default configs are equal', () => {
      getSelectedPageModelDefaultConfig.mockReturnValue(HOMEPAGE_DRAFT_CONFIG);
      expect(makeGetSelectedPageConfigMatchesDefault(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(true);
    });

    it('returns false if the draft and default configs are different', () => {
      getSelectedPageModelDefaultConfig.mockReturnValue(HOMEPAGE_PUBLISHED_CONFIG);
      expect(makeGetSelectedPageConfigMatchesDefault(CURRENT_PAGE_CODE)(MOCK_STATE)).toBe(false);
    });
  });
});
