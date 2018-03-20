import {
  getGroupedWidgetList, filterWidgetList, getViewList, getSearchFilter, getPageConfig,
  getConfigMap, getPageConfigCellMap, getToolbarExpanded, getContent,
} from 'state/page-config/selectors';
import { WIDGET_LIST, WIDGET_ONE_ELEMENT, WIDGET_ONE_LIST, WIDGETS_MAP } from 'test/mocks/widgetList';
import { getListWidget, getWidgetsMap } from 'state/widgets/selectors';
import { getLocale } from 'state/locale/selectors';
import { getParams } from 'frontend-common-components';
import { getSelectedPageModelCellMap } from 'state/page-models/selectors';
import { CELL_MAP } from 'test/mocks/page-models/complex';
import { HOMEPAGE_CONFIG } from 'test/mocks/pageConfig';
import { WIDGET_STATUS_MATCH, WIDGET_STATUS_DIFF, WIDGET_STATUS_REMOVED } from 'state/page-config/const';


jest.mock('state/page-models/selectors', () => ({
  getSelectedPageModelCellMap: jest.fn(),
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
  searchFilter: 'first',
  viewList: 'list',
  toolbarExpanded: true,
  configMap: {
    [CURRENT_PAGE_CODE]: HOMEPAGE_DRAFT_CONFIG,
  },
  publishedConfigMap: {
    [CURRENT_PAGE_CODE]: HOMEPAGE_PUBLISHED_CONFIG,
  },
};
const MOCK_STATE = {
  pageConfig: MOCK_DATA,
};


describe('state/page-config/selectors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    getListWidget.mockImplementation(() => WIDGET_LIST.payload);
    getWidgetsMap.mockReturnValue(WIDGETS_MAP);
    getLocale.mockReturnValue(CURRENT_LOCALE);
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
    expect(filterWidgetList(MOCK_STATE)).toEqual([WIDGET_ONE_ELEMENT]);
  });

  it('verify getGroupedWidgetList selector', () => {
    expect(getGroupedWidgetList(MOCK_STATE)).toEqual(WIDGET_ONE_LIST);
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

  describe('getPageConfigCellMap', () => {
    let mockState;
    beforeEach(() => {
      getSelectedPageModelCellMap.mockReturnValue(CELL_MAP);
      getParams.mockReturnValue({ pageCode: CURRENT_PAGE_CODE });
      mockState = { ...MOCK_STATE };
    });

    it('verify getPageConfigCellMap selector', () => {
      const configCellMap = getPageConfigCellMap(mockState);
      Object.keys(configCellMap).forEach((cellKey) => {
        const cell = configCellMap[cellKey];
        const draftItem = HOMEPAGE_DRAFT_CONFIG[cell.framePos];
        const publishedItem = HOMEPAGE_PUBLISHED_CONFIG[cell.framePos];

        if (draftItem || publishedItem) {
          const item = draftItem || publishedItem;
          expect(cell.widgetCode).toBe(item.type);
          expect(cell.widgetTitle).toBe(WIDGETS_MAP[item.type].titles[CURRENT_LOCALE]);
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
      getParams.mockReturnValue({});
      expect(getPageConfigCellMap(mockState)).toEqual(null);
    });
  });
});
