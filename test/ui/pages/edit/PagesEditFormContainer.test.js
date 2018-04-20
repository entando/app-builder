
import { mapDispatchToProps, mapStateToProps } from 'ui/pages/edit/PagesEditFormContainer';

// mocked
import { formValueSelector, valueSelector } from 'redux-form';
import { getParams } from '@entando/router';

// mock actions
jest.mock('state/groups/actions', () => ({
  fetchGroups: jest.fn().mockReturnValue('fetchGroups_result'),
}));

jest.mock('state/page-models/actions', () => ({
  fetchPageModels: jest.fn().mockReturnValue('fetchPageModels_result'),
}));

jest.mock('state/pages/actions', () => ({
  handleExpandPage: jest.fn().mockReturnValue('handleExpandPage_result'),
  fetchPageForm: jest.fn().mockReturnValue('fetchPageForm_result'),
  sendPutPage: jest.fn().mockReturnValue('sendPutPage_result'),
}));

getParams.mockReturnValue({ pageCode: 'page_code' });

jest.mock('state/groups/selectors', () => ({
  getGroupsIdList: jest.fn().mockReturnValue(['getGroups_result']),
}));

jest.mock('state/page-models/selectors', () => ({
  getPageModelsList: jest.fn().mockReturnValue('getPageModels_result'),
}));

jest.mock('state/pages/selectors', () => ({
  getCharsets: jest.fn().mockReturnValue('getCharsets_result'),
  getContentTypes: jest.fn().mockReturnValue('getContentTypes_result'),
}));

jest.mock('redux-form', () => {
  const valueSelectorMock = jest.fn();
  return {
    valueSelector: valueSelectorMock,
    formValueSelector: jest.fn().mockReturnValue(valueSelectorMock),
    reduxForm: () => () => () => ({}),
  };
});


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
      props = mapStateToProps(STATE);
    });

    it('props are correctly defined', () => {
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('pageCode', PAGE_CODE);
      expect(props).toHaveProperty('groups', expect.arrayContaining(['getGroups_result']));
      expect(props).toHaveProperty('pageModels', 'getPageModels_result');
      expect(props).toHaveProperty('charsets', 'getCharsets_result');
      expect(props).toHaveProperty('contentTypes', 'getContentTypes_result');
    });

    it('defines "selecedJoinGroups" prop = the joinGroups value from the page form', () => {
      expect(formValueSelector).toHaveBeenCalledWith('page');
      expect(valueSelector).toHaveBeenCalledWith(STATE, 'joinGroups');
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
        props.onWillMount({ pageCode: PAGE_CODE });
      });

      it('dispatch fetchGroups', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchGroups_result');
      });

      it('dispatch fetchPageModels', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchPageModels_result');
      });

      it('dispatch handleExpandPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('handleExpandPage_result');
      });

      it('dispatch fetchPageForm', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchPageForm_result');
      });
    });

    describe('prop onSubmit', () => {
      beforeEach(() => {
        props.onSubmit({ pageCode: PAGE_CODE });
      });
      it('dispatch sendPutPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('sendPutPage_result');
      });
    });
  });
});
