
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/add/PagesAddFormContainer';

// mocked
import { formValueSelector, change, mockSelector } from 'redux-form';
import { getGroups } from 'state/groups/selectors';
import { getPageModelsList } from 'state/page-models/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';


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
jest.mock('state/pages/actions', () => ({
  sendPostPage: jest.fn().mockReturnValue('sendPostPage_result'),
}));

jest.mock('redux-form', () => {
  const mockSelectorFunc = jest.fn().mockReturnValue('joinGroups_result');
  return {
    mockSelector: mockSelectorFunc,
    formValueSelector: jest.fn().mockReturnValue(mockSelectorFunc),
    change: jest.fn().mockReturnValue('change_result'),
    reduxForm: () => () => 'span',
  };
});


const STATE = {
  pages: {},
};

describe('PagesAddFormContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(STATE);
    });

    it('maps the "groups" prop with the getGroups selector', () => {
      expect(getGroups).toHaveBeenCalledWith(STATE);
      expect(props.groups).toBe('getGroups_result');
    });

    it('maps the "pageModels" prop with the getPageModels selector', () => {
      expect(getPageModelsList).toHaveBeenCalledWith(STATE);
      expect(props.pageModels).toBe('getPageModels_result');
    });

    it('maps the "charsets" prop with the getCharsets selector', () => {
      expect(getCharsets).toHaveBeenCalledWith(STATE);
      expect(props.charsets).toBe('getCharsets_result');
    });

    it('maps the "contentTypes" prop with the getContentTypes selector', () => {
      expect(getContentTypes).toHaveBeenCalledWith(STATE);
      expect(props.contentTypes).toBe('getContentTypes_result');
    });

    it('maps the "selectedJoinGroups" prop with the correct values from redux-form', () => {
      expect(formValueSelector).toHaveBeenCalledWith('page');
      expect(mockSelector).toHaveBeenCalledWith(STATE, 'joinGroups');
      expect(props.selectedJoinGroups).toBe('joinGroups_result');
    });

    it('maps the "initialValues" prop with the correct initial values for a page', () => {
      expect(props.initialValues).toEqual({
        seo: false,
        displayedInMenu: true,
        charset: 'utf-8',
        contentType: 'text/html',
      });
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onSubmit" prop a sendPostPage dispatch', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPostPage_result');
    });

    it('maps the "onChangeEnTitle" prop a redux-form change dispatch', () => {
      expect(props.onChangeEnTitle).toBeDefined();
      props.onChangeEnTitle('En Title');
      expect(dispatchMock).toHaveBeenCalledWith('change_result');
      expect(change).toHaveBeenCalledWith('page', 'code', 'en_title');
    });
  });
});
