import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/groups/list/GroupListTableContainer';
import { GROUPS_OK_PAGE_1, GROUPS_NORMALIZED } from 'test/mocks/groups';
import { getGroupsList } from 'state/groups/selectors';

const dispatchMock = jest.fn();

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));

const groups = GROUPS_OK_PAGE_1.payload;

getGroupsList.mockReturnValue(groups);

describe('GroupListTableContainer', () => {
  it('maps groups list property state in GroupsListTable', () => {
    expect(mapStateToProps(GROUPS_NORMALIZED)).toEqual({
      groups: GROUPS_OK_PAGE_1.payload,
      page: GROUPS_NORMALIZED.pagination.page,
      totalItems: GROUPS_NORMALIZED.pagination.lastPage * GROUPS_NORMALIZED.pagination.pageSize,
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
  });
});
