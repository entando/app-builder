import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/categories/common/CategoryTreeSelectorContainer';
import { STATE_NORMALIZED } from 'test/mocks/categories';

jest.mock('state/categories/actions', () => ({
  handleExpandCategory: jest.fn().mockReturnValue('handleExpandCategory_result'),
}));

describe('CategoryTreeSelectorContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(STATE_NORMALIZED);
    });

    it('maps categories property', () => {
      expect(props).toHaveProperty('categories');
      expect(props.categories).toHaveLength(STATE_NORMALIZED.categories.list.length);
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
