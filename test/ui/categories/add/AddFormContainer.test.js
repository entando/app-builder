import 'test/enzyme-init';
import { change } from 'redux-form';
import { mapStateToProps, mapDispatchToProps } from 'ui/categories/add/AddFormContainer';

const INITIAL_STATE = {
  categories: {
    list: [],
    map: {},
    childrenMap: {},
    titlesMap: {},
    statusMap: {},
  },
};

jest.mock('state/categories/actions', () => ({
  fetchCategoryTree: jest.fn().mockReturnValue('fetchCategoryTree_result'),
  sendPostCategory: jest.fn().mockReturnValue('sendPostCategory_result'),
  handleExpandCategory: jest.fn().mockReturnValue('handleExpandCategory_result'),
}));

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn().mockReturnValue('fetchLanguages_result'),
}));

jest.mock('state/categories/selectors', () => ({
  getCategoryTree: jest.fn().mockReturnValue('getCategoryTree_result'),
}));

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn().mockReturnValue('getActiveLanguages_result'),
  getDefaultLanguage: jest.fn().mockReturnValue('defaultLanguage_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn().mockReturnValue({ categories: false }),
}));

describe('AddFormContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(INITIAL_STATE);
    });

    it('maps categories, languages and loading property', () => {
      expect(props).toHaveProperty('mode', 'add');
      expect(props).toHaveProperty('categories', 'getCategoryTree_result');
      expect(props).toHaveProperty('activeLanguages', 'getActiveLanguages_result');
      expect(props).toHaveProperty('defaultLanguage', 'defaultLanguage_result');
      expect(props).toHaveProperty('loading', false);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onWillMount" prop a fetchCategoryTree and fetchLanguages dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalledWith('fetchCategoryTree_result');
      expect(dispatchMock).toHaveBeenCalledWith('fetchLanguages_result');
    });

    it('maps the "onSubmit" prop a sendPostRole dispatch', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPostCategory_result');
    });

    it('verify that "onChangeDefaultTitle" is defined by mapDispatchToProps', () => {
      expect(props.onChangeDefaultTitle).toBeDefined();
      props.onChangeDefaultTitle('Category Name');
      expect(change).toHaveBeenCalledWith('category', 'code', 'category_name');
    });

    it('verify that "onExpandCategory" is defined by mapDispatchToProps', () => {
      expect(props.onExpandCategory).toBeDefined();
      props.onExpandCategory('category_code');
      expect(dispatchMock).toHaveBeenCalledWith('handleExpandCategory_result');
    });
  });
});
