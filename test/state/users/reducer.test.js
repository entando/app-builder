import reducer from 'state/users/reducer';
import { setUsers, toggleLoading } from 'state/users/actions';
import { getUserList } from 'state/users/selectors';
import { USERS_OK } from 'test/mocks/users';

const users = USERS_OK.payload;

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
      newState = reducer(state, setUsers(USERS_OK.payload));
    });

    it('should define the dataType payload', () => {
      expect(getUserList(newState)).toEqual(USERS_OK.payload);
    });
  });

  describe('after action TOGGLE_LOADING', () => {
    beforeEach(() => {
      reducer(
        state,
        toggleLoading('users'),
      );
    });

    it('should be false in the first state', () => {
      expect(state.loading.users).toBeUndefined();
    });
    it('should be true after call', () => {
      const newState = reducer(
        state,
        toggleLoading('users'),
      );
      expect(newState.loading.users).toBe(true);
    });
  });
});
