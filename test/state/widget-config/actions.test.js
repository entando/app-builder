import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ADD_ERRORS } from '@entando/messages';

import { mockApi, mockThunk } from 'test/testUtils';

import { history } from 'app-init/router';
import { putPageWidget } from 'api/pages';
import { loadSelectedPage } from 'state/pages/actions';
import { loadSelectedPageModel } from 'state/page-models/actions';
import { loadSelectedWidget } from 'state/widgets/actions';


import { updateConfiguredPageWidget, initWidgetConfigPage } from 'state/widget-config/actions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const WIDGET_CONFIG = {
  code: 'widget_code',
};
const WIDGET = { code: 'widget_code' };
const PAGE = { code: 'page_code', pageModel: 'page_model_code' };
const PAGE_MODEL = { code: 'page_model_code' };

jest.mock('api/pages', () => ({
  putPageWidget: jest.fn(),
}));

jest.mock('state/pages/actions', () => ({
  loadSelectedPage: jest.fn(),
}));

jest.mock('state/page-models/actions', () => ({
  loadSelectedPageModel: jest.fn(),
}));

jest.mock('state/widgets/actions', () => ({
  loadSelectedWidget: jest.fn(),
}));

history.push = jest.fn();

describe('state/widget-config/actions', () => {
  const pageCode = 'page_code';
  const widgetCode = 'widget_code';
  const framePos = '0';
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    putPageWidget.mockImplementation(mockApi({ payload: WIDGET_CONFIG }));
    loadSelectedPage.mockImplementation(mockThunk(PAGE));
    loadSelectedPageModel.mockImplementation(mockThunk(PAGE_MODEL));
    loadSelectedWidget.mockImplementation(mockThunk(WIDGET));
    store = mockStore();
  });

  describe('updateConfiguredPageWidget', () => {
    it('if API response is ok, go to PAGE CONFIG route', (done) => {
      const params = { pageCode, widgetCode, framePos };
      store.dispatch(updateConfiguredPageWidget(WIDGET_CONFIG, params)).then(() => {
        expect(putPageWidget).toHaveBeenCalledWith(
          pageCode,
          parseInt(framePos, 10),
          { code: widgetCode, config: WIDGET_CONFIG },
        );
        expect(history.push).toHaveBeenCalledWith('/page/configuration/page_code');
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
      putPageWidget.mockImplementation(mockApi({ errors: true }));
      store.dispatch(updateConfiguredPageWidget(WIDGET_CONFIG, { pageCode })).then(() => {
        expect(store.getActions()).toHaveLength(1);
        expect(store.getActions()[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('initWidgetConfigPage', () => {
    it('if there is no selected page, do not load selected page model and widget', (done) => {
      loadSelectedPage.mockImplementation(mockThunk(null));
      store.dispatch(initWidgetConfigPage(pageCode, widgetCode)).then(() => {
        expect(loadSelectedPage).toHaveBeenCalledWith(pageCode);
        expect(loadSelectedPageModel).not.toHaveBeenCalled();
        expect(loadSelectedWidget).not.toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('if there is no selected page model, do not load selected widget', (done) => {
      loadSelectedPageModel.mockImplementation(mockThunk(null));
      store.dispatch(initWidgetConfigPage(pageCode, widgetCode)).then(() => {
        expect(loadSelectedPage).toHaveBeenCalledWith(pageCode);
        expect(loadSelectedPageModel).toHaveBeenCalledWith(PAGE.pageModel);
        expect(loadSelectedWidget).not.toHaveBeenCalled();
        done();
      }).catch(done.fail);
    });

    it('if there are selected page and page model, load selected widget', (done) => {
      store.dispatch(initWidgetConfigPage(pageCode, widgetCode)).then(() => {
        expect(loadSelectedPage).toHaveBeenCalledWith(pageCode);
        expect(loadSelectedPageModel).toHaveBeenCalledWith(PAGE.pageModel);
        expect(loadSelectedWidget).toHaveBeenCalledWith(widgetCode);
        done();
      }).catch(done.fail);
    });
  });
});
