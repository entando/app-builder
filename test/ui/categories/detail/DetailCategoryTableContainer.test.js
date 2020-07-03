import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/categories/detail/DetailCategoryTableContainer';

const INITIAL_STATE = {
  categories: {
    list: [],
    map: {},
    childrenMap: {},
    titlesMap: {},
    statusMap: {},
    selected: {},
  },
  pagination: {
    jacmsContentManager: {
      page: 1,
      pageSize: 10,
      totalItem: 20,
    },
    jacmsResourceManager: {
      page: 1,
      pageSize: 10,
      totalItem: 20,
    },
  },
  loading: {},
};

jest.mock('state/categories/actions', () => ({
  fetchCategoryDetail: jest.fn().mockReturnValue('fetchCategoryDetail_result'),
}));

jest.mock('state/categories/selectors', () => ({
  getSelected: jest.fn().mockReturnValue('getSelected_result'),
  getReferenceKeyList: jest.fn().mockReturnValue('getReferenceKeyList_result'),
  getReferenceMap: jest.fn().mockReturnValue('getReferenceMap_result'),
}));

const CATEGORY_CODE = 'category_code';
const ownProps = {
  match: {
    params: {
      categoryCode: CATEGORY_CODE,
    },
  },
};

describe('DetailCategoryTableContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(INITIAL_STATE, ownProps);
    });

    it('maps categories, languages and loading property', () => {
      expect(props).toHaveProperty('category', 'getSelected_result');
      expect(props).toHaveProperty('referenceList', 'getReferenceKeyList_result');
      expect(props).toHaveProperty('referenceMap', 'getReferenceMap_result');
      expect(props).toHaveProperty('categoryCode', CATEGORY_CODE);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "componentDidMount" prop a fetchCategoryDetail dispatch', () => {
      expect(props.componentDidMount).toBeDefined();
      props.componentDidMount(CATEGORY_CODE);
      expect(dispatchMock).toHaveBeenCalledWith('fetchCategoryDetail_result');
    });
  });
});
