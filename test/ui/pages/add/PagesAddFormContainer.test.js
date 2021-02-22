import {
  mapStateToProps,
  mapDispatchToProps,
  getNextPageName,
  getNextPageCode,
} from 'ui/pages/add/PagesAddFormContainer';

import { history, ROUTE_PAGE_TREE } from 'app-init/router';
// mocked
import { formValueSelector, change } from 'redux-form';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import {
  getCharsets,
  getContentTypes,
  getSelectedPageLocaleTitle,
} from 'state/pages/selectors';
import { DASHBOARD_PAYLOAD } from 'test/mocks/pages';
import { sendPostPage } from 'state/pages/actions';
import { ACTION_SAVE } from 'state/pages/const';
import { SEO_LANGDATA_BLANK } from 'ui/pages/common/const';
import { getActiveLanguages } from 'state/languages/selectors';
import { getAppTourProgress, getTourCreatedPage } from 'state/app-tour/selectors';
import { LANGUAGES_LIST as LANGUAGES } from 'test/mocks/languages';
import getSearchParam from 'helpers/getSearchParam';


jest.mock('state/pages/actions', () => ({
  sendPostPage: jest.fn(() => Promise.resolve({})),
}));

jest.mock('state/groups/selectors/', () => ({
  currentUserGroupsPermissionsFilter: jest.fn(() => () => 'filteredCurrentUserGroups_result'),
}));

jest.mock('state/app-tour/selectors', () => ({
  getAppTourProgress: jest.fn(),
  getTourCreatedPage: jest.fn(),
  getExistingPages: jest.fn(),
}));

jest.mock('state/page-templates/selectors', () => ({
  getPageTemplatesList: jest.fn().mockReturnValue('getPageTemplates_result'),
}));

jest.mock('state/pages/selectors', () => ({
  getCharsets: jest.fn().mockReturnValue('getCharsets_result'),
  getContentTypes: jest.fn().mockReturnValue('getContentTypes_result'),
  getSelectedPageLocaleTitle: jest
    .fn()
    .mockReturnValue('getSelectedPageLocaleTitle_result'),
}));

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn(),
}));

jest.mock('state/user-preferences/selectors', () => ({
  getUserPreferences: jest.fn(() => ({ defaultPageOwnerGroup: 'free', defaultPageJoinGroups: ['free'] })),
}));

jest.mock('state/users/selectors', () => ({
  getSelectedUserAuthoritiesList: jest.fn(),
}));

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

jest.mock('helpers/getSearchParam');

getAppTourProgress.mockReturnValue('cancelled');
getTourCreatedPage.mockReturnValue({});

getSearchParam.mockImplementation(paramName => paramName);

getActiveLanguages.mockReturnValue(LANGUAGES);

const STATE = {
  pages: {},
};

describe('getNextPageName', () => {
  it('otherString', () => {
    expect(getNextPageName({
      pages: [{ name: 'otherString' }],
      pattern: 'Hello World App',
      separator: ' ',
    })).toBe('Hello World App');
  });

  it('Hello World App', () => {
    expect(getNextPageName({
      pages: [{ name: 'Hello World App' }],
      pattern: 'Hello World App',
      separator: ' ',
    })).toBe('Hello World App 2');
  });

  it('Hello World App 1', () => {
    expect(getNextPageName({
      pages: [{ name: 'Hello World App 1' }],
      pattern: 'Hello World App',
      separator: ' ',
    })).toBe('Hello World App 2');
  });

  it('Hello World App 8dsada', () => {
    expect(getNextPageName({
      pages: [{ name: 'Hello World App 8dsada' }],
      pattern: 'Hello World App',
      separator: ' ',
    })).toBe('Hello World App');
  });

  it('Hello World App 8dsada 12', () => {
    expect(getNextPageName({
      pages: [{ name: 'Hello World App 8dsada 12' }],
      pattern: 'Hello World App',
      separator: ' ',
    })).toBe('Hello World App');
  });

  it('Hello World App 2', () => {
    expect(getNextPageName({
      pages: [{ name: 'Hello World App 2' }],
      pattern: 'Hello World App',
      separator: ' ',
    })).toBe('Hello World App 3');
  });

  it('Hello World App with multiple pages', () => {
    expect(getNextPageName({
      pages: [{ name: 'Hello World App' }, { name: 'Hello World App 2' }],
      pattern: 'Hello World App',
      separator: ' ',
    })).toBe('Hello World App 3');
  });
});
describe('getNextPageCode', () => {
  it('otherString', () => {
    expect(getNextPageCode({
      pages: [{ code: 'otherString' }],
      pattern: 'hello_world_app',
      separator: '_',
    })).toBe('hello_world_app');
  });

  it('hello_world_app', () => {
    expect(getNextPageCode({
      pages: [{ code: 'hello_world_app' }],
      pattern: 'hello_world_app',
      separator: '_',
    })).toBe('hello_world_app_2');
  });

  it('hello_world_app_1', () => {
    expect(getNextPageCode({
      pages: [{ code: 'hello_world_app_1' }],
      pattern: 'hello_world_app',
      separator: '_',
    })).toBe('hello_world_app_2');
  });

  it('hello_world_app_2dsada', () => {
    expect(getNextPageCode({
      pages: [{ code: 'hello_world_app_2dsada' }],
      pattern: 'hello_world_app',
      separator: '_',
    })).toBe('hello_world_app');
  });

  it('hello_world_app_2dsada_12', () => {
    expect(getNextPageCode({
      pages: [{ code: 'hello_world_app_2dsada_12' }],
      pattern: 'hello_world_app',
      separator: '_',
    })).toBe('hello_world_app');
  });

  it('hello_world_app_2dsada_12_5', () => {
    expect(getNextPageCode({
      pages: [{ code: 'hello_world_app_2dsada_12_5' }],
      pattern: 'hello_world_app',
      separator: '_',
    })).toBe('hello_world_app');
  });

  it('hello_world_app_2', () => {
    expect(getNextPageCode({
      pages: [{ code: 'hello_world_app_2' }],
      pattern: 'hello_world_app',
      separator: '_',
    })).toBe('hello_world_app_3');
  });
});

describe('PagesAddFormContainer', () => {
  beforeEach(jest.clearAllMocks);
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(STATE);
    });

    it('maps the "languages" prop with the getActiveLanguages selector', () => {
      expect(getActiveLanguages).toHaveBeenCalled();
      expect(props).toHaveProperty('languages', LANGUAGES);
    });

    it('maps the "groups" prop with the filtered current user groups', () => {
      expect(props.groups).toBe('filteredCurrentUserGroups_result');
    });

    it('maps the "pageTemplates" prop with the getPageTemplates selector', () => {
      expect(getPageTemplatesList).toHaveBeenCalledWith(STATE);
      expect(props.pageTemplates).toBe('getPageTemplates_result');
    });

    it('maps the "charsets" prop with the getCharsets selector', () => {
      expect(getCharsets).toHaveBeenCalledWith(STATE);
      expect(props.charsets).toBe('getCharsets_result');
    });

    it('maps the "contentTypes" prop with the getContentTypes selector', () => {
      expect(getContentTypes).toHaveBeenCalledWith(STATE);
      expect(props.contentTypes).toBe('getContentTypes_result');
    });

    it('maps the "parentTitle" prop with the getSelectedPageLocaleTitle selector', () => {
      expect(getSelectedPageLocaleTitle).toHaveBeenCalledWith(STATE);
      expect(props.parentTitle).toBe('getSelectedPageLocaleTitle_result');
    });

    it('maps the "selectedJoinGroups" prop with the correct values from redux-form', () => {
      expect(formValueSelector).toHaveBeenCalledWith('page');
    });

    it('maps the "initialValues" prop with the correct initial values for a page', () => {
      expect(props.initialValues).toEqual({
        seo: false,
        displayedInMenu: true,
        charset: 'utf-8',
        contentType: 'text/html',
        seoData: {
          useExtraDescriptions: false,
          seoDataByLang: {
            en: { ...SEO_LANGDATA_BLANK },
            it: { ...SEO_LANGDATA_BLANK },
            nl: { ...SEO_LANGDATA_BLANK },
          },
        },
        parentCode: 'parentCode',
        ownerGroup: 'free',
        joinGroups: ['free'],
      });
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn(args => args);
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onSubmit" prop a sendPostPage dispatch', (done) => {
      expect(props).toHaveProperty('onSubmit');
      props
        .onSubmit({ ...DASHBOARD_PAYLOAD, action: ACTION_SAVE })
        .then(() => {
          expect(sendPostPage).toHaveBeenCalled();
          expect(history.push).toHaveBeenCalledWith(ROUTE_PAGE_TREE);
          done();
        })
        .catch(done.fail);
    });

    it('maps the "onChangeDefaultTitle" prop a redux-form change dispatch', () => {
      expect(props).toHaveProperty('onChangeDefaultTitle');
      props.onChangeDefaultTitle('En Title');
      expect(change).toHaveBeenCalledWith('page', 'code', 'en_title');
    });
  });
});
