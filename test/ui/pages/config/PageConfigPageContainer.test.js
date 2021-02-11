import {
  mapDispatchToProps,
  mapStateToProps,
} from 'ui/pages/config/PageConfigPageContainer';

// mocked
import { reset, submit } from 'redux-form';

import { setSelectedPageTemplate } from 'state/page-templates/actions';
import {
  setSelectedPageOnTheFly,
  restoreSelectedPageConfig,
  applyDefaultConfig,
} from 'state/page-config/actions';
import {
  publishSelectedPage,
  unpublishSelectedPage,
} from 'state/pages/actions';

import { getSelectedPageTemplateCanBeOnTheFly } from 'state/page-templates/selectors';
import { getAppTourProgress } from 'state/app-tour/selectors';
import {
  makeGetPageIsOnTheFly,
  makeGetSelectedPageDiffersFromPublished,
  makeGetSelectedPageConfigMatchesDefault,
} from 'state/page-config/selectors';
import {
  getSelectedPage,
  getSelectedPageIsPublished,
  getSelectedPageLocaleTitle,
} from 'state/pages/selectors';
import { getLocale } from 'state/locale/selectors';

import { HOMEPAGE_PAYLOAD } from 'test/mocks/pages';

jest.mock('state/page-templates/selectors', () => ({
  getSelectedPageTemplateCanBeOnTheFly: jest.fn(),
}));

jest.mock('state/app-tour/selectors', () => ({
  getAppTourProgress: jest.fn(),
}));

jest.mock('state/page-config/selectors', () => ({
  makeGetPageIsOnTheFly: jest.fn(),
  makeGetSelectedPageDiffersFromPublished: jest.fn(),
  makeGetSelectedPageConfigMatchesDefault: jest.fn(),
}));

jest.mock('state/pages/selectors', () => ({
  getSelectedPage: jest.fn(),
  getSelectedPageIsPublished: jest.fn(),
  getSelectedPagePreviewURI: jest
    .fn()
    .mockReturnValue('getSelectedPagePreviewURI_result'),
  getSelectedPublishedPageURI: jest.fn()
    .mockReturnValue('getSelectedPublishedPageURI_result'),
  getSelectedPageLocaleTitle: jest.fn(),
}));

jest.mock('state/locale/selectors', () => ({
  getLocale: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn().mockReturnValue({}),
}));

jest.mock('state/page-templates/actions', () => ({
  setSelectedPageTemplate: jest.fn().mockReturnValue('setSelectedPageTemplate_result'),
}));

jest.mock('state/page-config/actions', () => ({
  initConfigPage: jest.fn().mockReturnValue('initConfigPage_result'),
  setSelectedPageOnTheFly: jest.fn(),
  restoreSelectedPageConfig: jest.fn(),
  applyDefaultConfig: jest.fn(),
}));

jest.mock('state/pages/actions', () => ({
  publishSelectedPage: jest.fn(),
  unpublishSelectedPage: jest.fn(),
}));

const PAGE = HOMEPAGE_PAYLOAD;
const ownProps = {
  match: {
    params: {
      pageCode: PAGE.code,
    },
  },
};

describe('PageConfigPageContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    let props;

    beforeEach(() => {
      getSelectedPage.mockReturnValue(PAGE);
      getSelectedPageLocaleTitle.mockReturnValue(PAGE.titles.en);
      getSelectedPageTemplateCanBeOnTheFly.mockReturnValue(true);
      getAppTourProgress.mockReturnValue('started');
      makeGetPageIsOnTheFly.mockReturnValue(() => true);
      makeGetSelectedPageDiffersFromPublished.mockReturnValue(() => true);
      makeGetSelectedPageConfigMatchesDefault.mockReturnValue(() => true);
      getSelectedPageIsPublished.mockReturnValue(true);
      getLocale.mockReturnValue('en');
      props = mapStateToProps({}, ownProps);
    });

    it('defines pageCode', () => {
      expect(props).toHaveProperty('pageCode', PAGE.code);
    });

    it('defines pageName', () => {
      expect(props.pageName).toBe(PAGE.titles.en);
    });

    it('defines pageStatus', () => {
      expect(props.pageStatus).toBe(PAGE.status);
    });

    it('defines isOnTheFlyEnabled', () => {
      expect(props.isOnTheFlyEnabled).toBe(true);
    });

    it('defines pageIsOnTheFly', () => {
      expect(props.pageIsOnTheFly).toBe(true);
    });

    it('defines pageIsPublished', () => {
      expect(props.pageIsPublished).toBe(true);
    });

    it('defines pageDiffersFromPublished', () => {
      expect(props.pageDiffersFromPublished).toBe(true);
    });

    it('defines pageConfigMatchesDefault', () => {
      expect(props.pageConfigMatchesDefault).toBe(true);
    });

    it('mapStateToProps if there is no selected page, returns an empty object', () => {
      getSelectedPage.mockReturnValue(null);
      expect(mapStateToProps({}, ownProps)).toEqual({});
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn(() => new Promise(res => res(jest.fn())));
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, ownProps);
    });

    describe('prop onWillMount', () => {
      beforeEach(() => {
        props.onWillMount();
      });
      it('dispatch initConfigPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('initConfigPage_result');
      });
    });

    describe('prop onWillUnmount', () => {
      beforeEach(() => {
        props.onWillUnmount();
      });
      it('dispatch setSelectedPageTemplate(null)', () => {
        expect(dispatchMock).toHaveBeenCalledWith('setSelectedPageTemplate_result');
        expect(setSelectedPageTemplate).toHaveBeenCalledWith(null);
      });
    });

    describe('prop setSelectedPageOnTheFly', () => {
      beforeEach(() => {
        props.setSelectedPageOnTheFly(true);
      });
      it('dispatch setSelectedPageOnTheFly(value)', () => {
        expect(dispatchMock).toHaveBeenCalled();
        expect(setSelectedPageOnTheFly).toHaveBeenCalledWith(true, PAGE.code);
      });
    });

    describe('prop restoreConfig', () => {
      beforeEach(() => {
        props.restoreConfig();
      });
      it('dispatch restoreSelectedPageConfig()', () => {
        expect(dispatchMock).toHaveBeenCalled();
        expect(restoreSelectedPageConfig).toHaveBeenCalled();
      });
    });

    describe('prop publishPage', () => {
      beforeEach(() => {
        props.publishPage();
      });
      it('dispatch publishSelectedPage()', () => {
        expect(dispatchMock).toHaveBeenCalled();
        expect(publishSelectedPage).toHaveBeenCalled();
      });
    });

    describe('prop unpublishPage', () => {
      beforeEach(() => {
        props.unpublishPage();
      });
      it('dispatch publishSelectedPage()', () => {
        expect(dispatchMock).toHaveBeenCalled();
        expect(unpublishSelectedPage).toHaveBeenCalled();
      });
    });

    describe('prop applyDefaultConfig', () => {
      beforeEach(() => {
        props.applyDefaultConfig();
      });
      it('dispatch applyDefaultConfig()', () => {
        expect(dispatchMock).toHaveBeenCalled();
        expect(applyDefaultConfig).toHaveBeenCalled();
      });
    });

    describe('prop onCancelSettings', () => {
      it('should dispatch redux-form reset()', () => {
        props.onSettingsCancel();
        expect(dispatchMock.mock.calls.length).toBe(2);
        expect(reset.mock.calls.length).toBe(2);
        expect(reset.mock.calls[0][0]).toBe('pageEdit');
        expect(reset.mock.calls[1][0]).toBe('SeoMetadataForm');
      });
    });

    describe('prop onClickSaveSettings', () => {
      it('should dispatch redux-form reset()', (done) => {
        props.onClickSaveSettings().then(() => {
          expect(dispatchMock.mock.calls.length).toBe(3);
          expect(submit).toHaveBeenCalledWith('pageEdit');
          expect(reset.mock.calls.length).toBe(2);
          expect(reset.mock.calls[0][0]).toBe('pageEdit');
          expect(reset.mock.calls[1][0]).toBe('SeoMetadataForm');
          done();
        }).catch(done.fail);
      });
    });
  });
});
