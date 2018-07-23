import reducer from 'state/user-profile/reducer';
import { setUserProfile } from 'state/user-profile/actions';


const USER_PROFILE = {
  id: 'admin',
  typeCode: 'administration',
  typeDescription: 'The most powerful profile type',
  attributes: [],
};

describe('state/user-profile/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('id', null);
    expect(INITIAL_STATE).toHaveProperty('typeCode', null);
    expect(INITIAL_STATE).toHaveProperty('typeDescription', null);
    expect(INITIAL_STATE).toHaveProperty('attributes', []);
  });

  describe('after action SET_USER_PROFILE', () => {
    it('new user profile is returned ', () => {
      const newState = reducer(INITIAL_STATE, setUserProfile(USER_PROFILE));
      expect(newState).toEqual(USER_PROFILE);
    });
  });
});
