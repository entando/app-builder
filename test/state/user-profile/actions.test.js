import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mockApi } from 'test/testUtils';

import { gotoRoute } from '@entando/router';
import { getUserProfile, putUserProfile } from 'api/userProfile';

import { SET_SELECTED_PROFILE_TYPE } from 'state/profile-types/types';
import { SET_USER_PROFILE } from 'state/user-profile/types';
import { setUserProfile, fetchUserProfile, updateUserProfile } from 'state/user-profile/actions';


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

      const actions = store.getActions();
      expect(actions).toHaveLength(4);
      expect(actions[0]).toHaveProperty('type', SET_USER_PROFILE);
      expect(actions[1]).toHaveProperty('type', SET_SELECTED_PROFILE_TYPE);
      expect(actions[2]).toHaveProperty('type', '@@redux-form/INITIALIZE');
      expect(actions[3]).toHaveProperty('type', '@@redux-form/INITIALIZE');
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
      expect(gotoRoute).toHaveBeenCalled();
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
