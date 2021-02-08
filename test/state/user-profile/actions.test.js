import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mockApi } from 'test/testUtils';
import { history } from 'app-init/router';

import { getUserProfile, putUserProfile, getUserProfilePicture, deleteUserProfilePicture, postUserProfilePicture } from 'api/userProfile';
import { USER_PROFILE_PICTURE } from 'test/mocks/userProfile';

import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_SELECTED_PROFILE_TYPE } from 'state/profile-types/types';
import { SET_USER_PROFILE, SET_USER_PROFILE_PICTURE } from 'state/user-profile/types';
import { setUserProfile, fetchUserProfile, updateUserProfile, setUserProfilePicture, deleteProfilePicture, uploadProfilePicture } from 'state/user-profile/actions';

jest.mock('state/profile-types/selectors', () => ({
  getSelectedProfileTypeAttributes: jest.fn(() => 'getSelectedProfileTypeAttributes_result'),
}));
jest.mock('state/languages/selectors', () => ({
  getDefaultLanguage: jest.fn(() => 'getDefaultLanguage_result'),
  getActiveLanguages: jest.fn(() => 'getActiveLanguages_result'),
}));
jest.mock('helpers/entities', () => ({
  getPayloadForForm: jest.fn(() => 'getPayloadForForm_result'),
  getPayloadForApi: jest.fn(() => 'getPayloadForApi_result'),
}));
jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

const mockStore = configureMockStore([thunk]);


const USER_PROFILE = {
  id: 'admin',
  typeCode: 'administration',
  typeDescription: 'The most powerful profile type',
  attributes: [],
};

const store = mockStore();

beforeEach(() => {
  jest.clearAllMocks();
  store.clearActions();
});

describe('setUserProfile', () => {
  const action = setUserProfile(USER_PROFILE);

  it('should have type SET_USER_PROFILE', () => {
    expect(action.type).toBe(SET_USER_PROFILE);
  });

  it('should have a payload with a profile prop', () => {
    expect(action.payload).toEqual({
      profile: USER_PROFILE,
    });
  });
});

describe('fetchUserProfile', () => {
  const USER_NAME = 'myusername';

  it('should dispatch SET_USER_PROFILE', (done) => {
    store.dispatch(fetchUserProfile(USER_NAME)).then(() => {
      expect(getUserProfile).toHaveBeenCalledWith(USER_NAME);
      expect(getUserProfile).toHaveBeenCalledWith(USER_NAME);
      expect(getUserProfilePicture).toHaveBeenCalledWith(USER_NAME);

      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', SET_USER_PROFILE);
      expect(actions[1]).toHaveProperty('type', SET_SELECTED_PROFILE_TYPE);
      expect(actions[2]).toHaveProperty('type', '@@redux-form/INITIALIZE');
      expect(actions[3]).toHaveProperty('type', '@@redux-form/INITIALIZE');
      expect(actions[4]).toHaveProperty('type', SET_USER_PROFILE_PICTURE);
      done();
    }).catch(done.fail);
  });

  it('if the API returns error, should set up error messages', (done) => {
    getUserProfile.mockImplementation(mockApi({ errors: true }));
    store.dispatch(fetchUserProfile(USER_NAME)).then(() => {
      expect(getUserProfile).toHaveBeenCalledWith(USER_NAME);

      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[1]).toHaveProperty('type', 'toasts/add-toast');
      done();
    }).catch(done.fail);
  });
});

describe('updateUserProfile', () => {
  const USER_NAME = 'myusername';

  it('should update the user profile and set up a success toast message', (done) => {
    store.dispatch(updateUserProfile(USER_NAME)).then(() => {
      expect(putUserProfile).toHaveBeenCalled();

      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', SET_USER_PROFILE);
      expect(actions[1]).toHaveProperty('type', 'toasts/add-toast');
      expect(history.push).toHaveBeenCalled();
      done();
    }).catch(done.fail);
  });

  it('should update the user profile and set up a success toast message without redirecting', (done) => {
    store.dispatch(updateUserProfile(USER_NAME, false)).then(() => {
      expect(putUserProfile).toHaveBeenCalled();

      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', SET_USER_PROFILE);
      expect(actions[1]).toHaveProperty('type', 'toasts/add-toast');
      expect(history.push).toHaveBeenCalledTimes(0);
      done();
    }).catch(done.fail);
  });

  it('if the API returns error, should set up error messages', (done) => {
    putUserProfile.mockImplementation(mockApi({ errors: true }));
    store.dispatch(fetchUserProfile(USER_NAME)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(2);
      expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[1]).toHaveProperty('type', 'toasts/add-toast');
      done();
    }).catch(done.fail);
  });
});

describe('setUserProfilePicture', () => {
  const action = setUserProfilePicture(USER_PROFILE_PICTURE);

  it('should have type SET_USER_PROFILE_PICTURE', () => {
    expect(action.type).toBe(SET_USER_PROFILE_PICTURE);
  });

  it('should have a payload with a profile prop', () => {
    expect(action.payload).toEqual({
      versions: USER_PROFILE_PICTURE,
    });
  });
});

describe('deleteProfilePicture', () => {
  const USER_NAME = 'myusername';

  it('should delete the user profile picture', (done) => {
    store.dispatch(deleteProfilePicture(USER_NAME)).then(() => {
      expect(deleteUserProfilePicture).toHaveBeenCalled();

      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', SET_USER_PROFILE_PICTURE);
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('if the API returns error, should set up error messages', (done) => {
    deleteUserProfilePicture.mockImplementation(mockApi({ errors: true }));
    store.dispatch(deleteProfilePicture(USER_NAME)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(4);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[2]).toHaveProperty('type', 'toasts/add-toast');
      expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });
});

describe('uploadProfilePicture', () => {
  const USER_NAME = 'myusername';
  const picture = ['test'];

  it('should upload the user profile picture', (done) => {
    store.dispatch(uploadProfilePicture(USER_NAME, picture)).then(() => {
      expect(postUserProfilePicture).toHaveBeenCalled();

      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', SET_USER_PROFILE_PICTURE);
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('if the API returns error, should set up error messages', (done) => {
    postUserProfilePicture.mockImplementation(mockApi({ errors: true }));
    store.dispatch(uploadProfilePicture(USER_NAME, picture)).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', 'toasts/add-toast');
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });
});
