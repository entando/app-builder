import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/categories/list/CategoryTreeContainer';

const CATEGORY_CODE = 'category_code';

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
  handleExpandCategory: jest.fn().mockReturnValue('handleExpandCategory_result'),
}));

jest.mock('state/loading/actions', () => ({
  toggleLoading: jest.fn(),
}));

jest.mock('state/categories/selectors', () => ({
  getCategoryTree: jest.fn().mockReturnValue('getCategoryTree_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn().mockReturnValue('loading_result'),
}));

describe('CategoryTreeContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(INITIAL_STATE);
    });

    it('maps categories property', () => {
      expect(props).toHaveProperty('categories', 'getCategoryTree_result');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onExpandCategory).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalledWith('fetchCategoryTree_result');
    });

    it('should dispatch an action if onExpandCategory is called', () => {
      props.onExpandCategory(CATEGORY_CODE);
      expect(dispatchMock).toHaveBeenCalledWith('handleExpandCategory_result');
    });
  });
});
