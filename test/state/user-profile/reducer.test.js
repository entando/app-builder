import reducer from 'state/user-profile/reducer';
import { setUserProfile, setUserProfilePicture } from 'state/user-profile/actions';

import { USER_PROFILE_PICTURE } from 'test/mocks/userProfile';


const USER_PROFILE = {
  id: 'admin',
  typeCode: 'administration',
  typeDescription: 'The most powerful profile type',
  attributes: [],
  profilePicture: null,
};

describe('state/user-profile/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('id', null);
    expect(INITIAL_STATE).toHaveProperty('typeCode', null);
    expect(INITIAL_STATE).toHaveProperty('typeDescription', null);
    expect(INITIAL_STATE).toHaveProperty('attributes', []);
    expect(INITIAL_STATE).toHaveProperty('profilePicture', null);
  });

  describe('after action SET_USER_PROFILE', () => {
    it('new user profile is returned ', () => {
      const newState = reducer(INITIAL_STATE, setUserProfile(USER_PROFILE));
      expect(newState).toEqual(USER_PROFILE);
    });
  });

  describe('after action SET_USER_PROFILE_PICTURE', () => {
    it('new user profile picture is returned ', () => {
      const newState = reducer(INITIAL_STATE, setUserProfilePicture(USER_PROFILE_PICTURE.versions));
      expect(newState).toEqual({ ...INITIAL_STATE, profilePicture: USER_PROFILE_PICTURE.versions });
    });
  });
});
