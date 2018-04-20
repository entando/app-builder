import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/categories/common/CategoryTreeSelectorContainer';

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

jest.mock('state/categories/selectors', () => ({
  getCategoryTree: jest.fn().mockReturnValue('getCategoryTree_result'),
}));

describe('CategoryTreeSelectorContainer', () => {
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

    it('verify that "onExpandCategory" is defined by mapDispatchToProps', () => {
      expect(props.onExpandCategory).toBeDefined();
      props.onExpandCategory('category_code');
      expect(dispatchMock).toHaveBeenCalledWith('handleExpandCategory_result');
    });
  });
});
