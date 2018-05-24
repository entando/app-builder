
import { mapDispatchToProps, mapStateToProps } from 'ui/pages/config/PageConfigPageContainer';

// mocked
import { setSelectedPageModel } from 'state/page-models/actions';
import { setSelectedPageOnTheFly, restoreSelectedPageConfig, applyDefaultConfig } from 'state/page-config/actions';
import { publishSelectedPage, unpublishSelectedPage } from 'state/pages/actions';

import { getSelectedPageModelCanBeOnTheFly } from 'state/page-models/selectors';
import { getPageIsOnTheFly, getSelectedPageDiffersFromPublished, getSelectedPageConfigMatchesDefault } from 'state/page-config/selectors';
import { getSelectedPage, getSelectedPageIsPublished } from 'state/pages/selectors';
import { getLocale } from 'state/locale/selectors';

import { HOMEPAGE_PAYLOAD } from 'test/mocks/pages';

jest.mock('state/page-models/selectors', () => ({
  getSelectedPageModelCanBeOnTheFly: jest.fn(),
}));

jest.mock('state/page-config/selectors', () => ({
  getPageIsOnTheFly: jest.fn(),
  getSelectedPageDiffersFromPublished: jest.fn(),
  getSelectedPageConfigMatchesDefault: jest.fn(),
}));

jest.mock('state/pages/selectors', () => ({
  getSelectedPage: jest.fn(),
  getSelectedPageIsPublished: jest.fn(),
  getSelectedPagePreviewURI: jest.fn().mockReturnValue('getSelectedPagePreviewURI_result'),
}));

jest.mock('state/locale/selectors', () => ({
  getLocale: jest.fn(),
}));


jest.mock('state/page-models/actions', () => ({
  setSelectedPageModel: jest.fn().mockReturnValue('setSelectedPageModel_result'),
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


describe('PageConfigPageContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    const PAGE = HOMEPAGE_PAYLOAD;
    let props;
    beforeEach(() => {
      getSelectedPage.mockReturnValue(PAGE);
      getSelectedPageModelCanBeOnTheFly.mockReturnValue(true);
      getPageIsOnTheFly.mockReturnValue(true);
      getSelectedPageDiffersFromPublished.mockReturnValue(true);
      getSelectedPageConfigMatchesDefault.mockReturnValue(true);
      getSelectedPageIsPublished.mockReturnValue(true);
      getLocale.mockReturnValue('en');
      props = mapStateToProps({});
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
      expect(mapStateToProps({})).toEqual({});
    });
  });


  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
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
      it('dispatch setSelectedPageModel(null)', () => {
        expect(dispatchMock).toHaveBeenCalledWith('setSelectedPageModel_result');
        expect(setSelectedPageModel).toHaveBeenCalledWith(null);
      });
    });

    describe('prop setSelectedPageOnTheFly', () => {
      beforeEach(() => {
        props.setSelectedPageOnTheFly(true);
      });
      it('dispatch setSelectedPageOnTheFly(value)', () => {
        expect(dispatchMock).toHaveBeenCalled();
        expect(setSelectedPageOnTheFly).toHaveBeenCalledWith(true);
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
  });
});
