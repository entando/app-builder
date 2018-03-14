import reducer from 'state/users/reducer';
import { setUsers } from 'state/users/actions';
import { getUserList } from 'state/users/selectors';
import { USERS_OK_PAGE_1 } from 'test/mocks/users';

const users = USERS_OK_PAGE_1.payload;

jest.mock('state/users/selectors', () => ({
  getUserList: jest.fn(),
}));

getUserList.mockReturnValue(users);

describe('state/users/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_USERS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setUsers(USERS_OK_PAGE_1.payload));
    });

    it('should define the dataType payload', () => {
      expect(getUserList(newState)).toEqual(USERS_OK_PAGE_1.payload);
    });
  });
});
