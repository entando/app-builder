import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/list/FragmentListTableContainer';
import { fetchFragments } from 'state/fragments/actions';
import { LIST_FRAGMENTS_OK } from 'test/mocks/fragments';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/fragments/list/DeleteFragmentModal';

const TEST_STATE = {
  fragments: { list: LIST_FRAGMENTS_OK },
  pagination: {
    global: {
      page: 1,
      pageSize: 10,
      lastPage: 2,
      totalItems: 20,
    },
  },
};

jest.mock('state/fragments/actions', () => ({
  fetchFragments: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

getLoading.mockReturnValue(false);

const dispatchMock = jest.fn();

describe('FragmentListTableContainer', () => {
  it('maps fragmentList property state in FragmentListTable', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      fragments: TEST_STATE.fragments.list,
      page: TEST_STATE.pagination.global.page,
      totalItems: TEST_STATE.pagination.global.totalItems,
      pageSize: TEST_STATE.pagination.global.pageSize,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onClickDelete).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchFragments).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete({ code: 'CODE' });
      expect(dispatchMock).toHaveBeenCalled();
      expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'fragment', code: 'CODE' });
    });
  });
});
