
import { mapDispatchToProps, mapStateToProps } from 'ui/pages/edit/PagesEditFormContainer';
import { getGroupsList } from 'state/groups/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { LANGUAGES_LIST as LANGUAGES } from 'test/mocks/languages';

// mocked
import { formValueSelector } from 'redux-form';

// mock actions
jest.mock('state/groups/actions', () => ({
  fetchGroups: jest.fn().mockReturnValue('fetchGroups_result'),
}));

jest.mock('state/page-templates/actions', () => ({
  fetchPageTemplates: jest.fn().mockReturnValue('fetchPageTemplates_result'),
}));

jest.mock('state/pages/actions', () => ({
  handleExpandPage: jest.fn().mockReturnValue('handleExpandPage_result'),
  fetchPageForm: jest.fn().mockReturnValue('fetchPageForm_result'),
  sendPutPage: jest.fn(() => Promise.resolve({})),
  clearTree: jest.fn().mockReturnValue('clearTree_result'),
}));

const ownProps = {
  match: {
    params: {
      pageCode: 'page_code',
    },
  },
};

const GROUPS = [{ code: 'group', name: 'groupName' }];

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));

getGroupsList.mockReturnValue(GROUPS);

jest.mock('state/page-templates/selectors', () => ({
  getPageTemplatesList: jest.fn().mockReturnValue('getPageTemplates_result'),
}));

jest.mock('state/pages/selectors', () => ({
  getCharsets: jest.fn().mockReturnValue('getCharsets_result'),
  getContentTypes: jest.fn().mockReturnValue('getContentTypes_result'),
  getPageTreePages: jest.fn().mockReturnValue([]),
}));

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn(),
}));

getActiveLanguages.mockReturnValue(LANGUAGES);

const PAGE_CODE = 'page_code';
const STATE = {};

describe('PagesEditFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('mapStateToProps', () => {
    let props;

    beforeEach(() => {
      props = mapStateToProps(STATE, ownProps);
    });

    it('props are correctly defined', () => {
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('pageCode', PAGE_CODE);
      expect(props).toHaveProperty('languages', LANGUAGES);
      expect(props).toHaveProperty('groups', GROUPS);
      expect(props).toHaveProperty('pageTemplates', 'getPageTemplates_result');
      expect(props).toHaveProperty('charsets', 'getCharsets_result');
      expect(props).toHaveProperty('contentTypes', 'getContentTypes_result');
    });

    it('defines "selecedJoinGroups" prop = the joinGroups value from the page form', () => {
      expect(formValueSelector).toHaveBeenCalledWith('page');
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn(arg => arg);
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    describe('prop onWillMount', () => {
      beforeEach(() => {
        props.onWillMount({ pageCode: PAGE_CODE });
      });

      it('dispatch clearTree', () => {
        expect(dispatchMock).toHaveBeenCalledWith('clearTree_result');
      });

      it('dispatch fetchLanguages', () => {
        expect(dispatchMock).toHaveBeenCalled();
      });

      it('dispatch fetchGroups', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchGroups_result');
      });

      it('dispatch fetchPageTemplates', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchPageTemplates_result');
      });

      it('dispatch handleExpandPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('handleExpandPage_result');
      });

      it('dispatch fetchPageForm', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchPageForm_result');
      });
    });

    describe('prop onSubmit', () => {
      it('dispatch sendPutPage', () => {
        expect(props).toHaveProperty('onSubmit');
        props.onSubmit({ pageCode: PAGE_CODE, action: 'save' });
      });
    });
  });
});
