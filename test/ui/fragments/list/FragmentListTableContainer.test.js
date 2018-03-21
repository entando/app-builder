import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/list/FragmentListTableContainer';
import { LIST_FRAGMENTS_OK } from 'test/mocks/fragments';

const TEST_STATE = {
  fragments: { list: LIST_FRAGMENTS_OK },
  pagination: {
    page: 1,
    pageSize: 10,
    lastPage: 2,
    totalItems: 20,
  },
};

const dispatchMock = jest.fn();

describe('FragmentListTableContainer', () => {
  it('maps fragmentList property state in FragmentListTable', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      fragments: TEST_STATE.fragments.list,
      page: TEST_STATE.pagination.page,
      totalItems: TEST_STATE.pagination.lastPage * TEST_STATE.pagination.pageSize,
      pageSize: TEST_STATE.pagination.pageSize,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
