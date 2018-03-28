import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/users/list/UserListTableContainer';
import { USERS_OK } from 'test/mocks/users';
import { getUserList, getUsersLoading } from 'state/users/selectors';

const TEST_STATE = {
  users: {
    list: [],
    map: {},
  },
  pagination: USERS_OK.metaData,
};

const dispatchMock = jest.fn();

jest.mock('state/users/selectors', () => ({
  getUserList: jest.fn(),
  getUsersLoading: jest.fn(),
}));

const users = USERS_OK.payload;

getUserList.mockReturnValue(users);
getUsersLoading.mockReturnValue(false);

describe('UserListTableContainer', () => {
  it('maps users list property state in UsersListTable', () => {
    const props = mapStateToProps(TEST_STATE);
    expect.assertions(4);
    expect(props).toBeInstanceOf(Object);
    expect(props).toHaveProperty('users');
    expect(props).toHaveProperty('loading');
    expect(props).toMatchObject({
      users: USERS_OK.payload,
      page: 1,
      totalItems: 4,
      pageSize: 10,
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
