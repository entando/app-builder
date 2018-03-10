
import { mapDispatchToProps, mapStateToProps } from 'ui/pages/edit/PagesEditFormContainer';

// mocked
import { formValueSelector, valueSelector } from 'redux-form';

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

jest.mock('frontend-common-components', () => ({
  getParams: jest.fn().mockReturnValue({ pageCode: 'page_code' }),
}));

jest.mock('state/groups/selectors', () => ({
  getGroups: jest.fn().mockReturnValue('getGroups_result'),
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

    it('defines "mode" prop = "edit"', () => {
      expect(props.mode).toBe('edit');
    });

    it('defines "pageCode" prop = the "pageCode" route param', () => {
      expect(props.pageCode).toBe(PAGE_CODE);
    });

    it('defines "groups" prop = the groups array from the state', () => {
      expect(props.groups).toBe('getGroups_result');
    });

    it('defines "pageModels" prop = the page models array from the state', () => {
      expect(props.pageModels).toBe('getPageModels_result');
    });

    it('defines "charsets" prop = the charsets array from the state', () => {
      expect(props.charsets).toBe('getCharsets_result');
    });

    it('defines "contentTypes" prop = the content types array from the state', () => {
      expect(props.contentTypes).toBe('getContentTypes_result');
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
