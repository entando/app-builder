import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/users/list/UserListTableContainer';
import { USERS } from 'test/mocks/users';
import { getUserList } from 'state/users/selectors';
import { getLoading } from 'state/loading/selectors';

const dispatchMock = jest.fn();

jest.mock('state/users/selectors', () => ({
  getUserList: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

jest.mock('state/pagination/selectors', () => ({
  getCurrentPage: jest.fn(),
  getTotalItems: jest.fn(),
  getPageSize: jest.fn(),
}));
const users = USERS;

getUserList.mockReturnValue(users);
getLoading.mockReturnValue(false);

describe('UserListTableContainer', () => {
  it('maps users list property state in UsersListTable', () => {
    const props = mapStateToProps({});
    expect.assertions(3);
    expect(props).toBeInstanceOf(Object);
    expect(props).toHaveProperty('users');
    expect(props).toHaveProperty('loading');
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onWillMount');
      expect(props).toHaveProperty('onClickDelete');
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete({ username: 'admin' });
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
