import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/groups/list/GroupListTableContainer';
import { LIST_GROUPS_OK, GROUPS_NORMALIZED } from 'test/mocks/groups';
import { getGroupsList } from 'state/groups/selectors';

const dispatchMock = jest.fn();

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));

getGroupsList.mockReturnValue(LIST_GROUPS_OK);

describe('GroupListTableContainer', () => {
  it('maps groups list property state in GroupsListTable', () => {
    expect(mapStateToProps(GROUPS_NORMALIZED)).toEqual({
      groups: LIST_GROUPS_OK,
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
