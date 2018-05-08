import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/groups/list/GroupListTableContainer';
import { LIST_GROUPS_OK, GROUPS_NORMALIZED } from 'test/mocks/groups';
import { getGroupsList } from 'state/groups/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/groups/common/DeleteGroupModal';
import { getLoading } from 'state/loading/selectors';

const dispatchMock = jest.fn();

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

getGroupsList.mockReturnValue(LIST_GROUPS_OK);

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);

describe('GroupListTableContainer', () => {
  it('maps groups list property state in GroupsListTable', () => {
    expect(mapStateToProps(GROUPS_NORMALIZED)).toEqual({
      groups: LIST_GROUPS_OK,
      page: GROUPS_NORMALIZED.pagination.page,
      totalItems: GROUPS_NORMALIZED.pagination.totalItems,
      pageSize: GROUPS_NORMALIZED.pagination.pageSize,
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

    it('should dispatch an action if onClickDelete is called', () => {
      expect(props.onClickDelete).toBeDefined();
      props.onClickDelete({ code: 'group_code' });
      expect(dispatchMock).toHaveBeenCalled();
      expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'group', code: 'group_code' });
    });
  });
});
