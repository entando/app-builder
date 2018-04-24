import reducer from 'state/users/reducer';
import { setUsers, setSelectedUserDetail } from 'state/users/actions';
import { USERS } from 'test/mocks/users';

const users = USERS;

describe('state/users/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_USERS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setUsers(users));
    });

    it('should define the dataType payload', () => {
      users.forEach((user, i) => {
        expect(newState.list[i]).toBe(user.username);
      });
    });
  });

  describe('after action SET_SELECTED_USERS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedUserDetail(users[0].username));
    });

    it('should define the dataType payload', () => {
      expect(newState.selected).toEqual(users[0].username);
    });
  });
});
