import 'test/enzyme-init';
import { getParams } from '@entando/router';
import { mapStateToProps, mapDispatchToProps } from 'ui/categories/detail/DetailCategoryTableContainer';

const CATEGORY_CODE = { categoryCode: 'category_code' };

const INITIAL_STATE = {
  categories: {
    list: [],
    map: {},
    childrenMap: {},
    titlesMap: {},
    statusMap: {},
    selected: {},
  },
};

jest.mock('state/categories/actions', () => ({
  fetchCategoryDetail: jest.fn().mockReturnValue('fetchCategoryDetail_result'),
}));

jest.mock('state/categories/selectors', () => ({
  getSelected: jest.fn().mockReturnValue('getSelected_result'),
  getReferenceKeyList: jest.fn().mockReturnValue('getReferenceKeyList_result'),
  getReferenceMap: jest.fn().mockReturnValue('getReferenceMap_result'),
}));

getParams.mockReturnValue(CATEGORY_CODE);

describe('DetailCategoryTableContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(INITIAL_STATE);
    });

    it('maps categories, languages and loading property', () => {
      expect(props).toHaveProperty('category', 'getSelected_result');
      expect(props).toHaveProperty('referenceList', 'getReferenceKeyList_result');
      expect(props).toHaveProperty('referenceMap', 'getReferenceMap_result');
      expect(props).toHaveProperty('categoryCode', CATEGORY_CODE.categoryCode);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onWillMount" prop a fetchCategoryDetail dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount(CATEGORY_CODE);
      expect(dispatchMock).toHaveBeenCalledWith('fetchCategoryDetail_result');
    });
  });
});
