import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/dashboard/UserManagementContainer';
import { fetchUsersTotal } from 'state/users/actions';
import { fetchGroupsTotal } from 'state/groups/actions';

const TEST_STATE = {
  users: { total: 5 },
  groups: { total: 2 },
};

jest.mock('state/users/actions', () => ({
  fetchUsersTotal: jest.fn(),
}));

jest.mock('state/groups/actions', () => ({
  fetchGroupsTotal: jest.fn(),
}));

describe('UserManagementContainer', () => {
  it('maps users and groups properties', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      users: 5,
      groups: 2,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(jest.fn());
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onWillMount');
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(fetchUsersTotal).toHaveBeenCalled();
      expect(fetchGroupsTotal).toHaveBeenCalled();
    });
  });
});
