import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/categories/list/CategoryTreeContainer';
import { CATEGORY_TREE_HOME, STATE_NORMALIZED } from 'test/mocks/categories';
import { getCategoryTree } from 'state/categories/selectors';
import { handleExpandCategory, fetchCategoryTree } from 'state/categories/actions';

const dispatchMock = jest.fn();
const CATEGORY_CODE = 'category_code';

jest.mock('state/categories/actions', () => ({
  fetchCategoryTree: jest.fn(),
  handleExpandCategory: jest.fn(),
}));

jest.mock('state/categories/selectors', () => ({
  getCategoryTree: jest.fn(),
}));

getCategoryTree.mockReturnValue(CATEGORY_TREE_HOME);

describe('CategoryTreeContainer', () => {
  it('maps categories list property state in CategoryTreeContainer', () => {
    expect(mapStateToProps(STATE_NORMALIZED)).toEqual({
      categories: CATEGORY_TREE_HOME,
      loading: false,
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
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchCategoryTree).toHaveBeenCalled();
    });

    it('should dispatch an action if onExpandCategory is called', () => {
      props.onExpandCategory(CATEGORY_CODE);
      expect(dispatchMock).toHaveBeenCalled();
      expect(handleExpandCategory).toHaveBeenCalledWith(CATEGORY_CODE);
    });
  });
});
