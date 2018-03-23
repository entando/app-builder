import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setProfileTypes, fetchProfileTypes } from 'state/profile-types/actions';
import { SET_PROFILE_TYPES } from 'state/profile-types/types';
import { SET_PAGE } from 'state/pagination/types';
import { PROFILE_TYPES_OK_PAGE_1 } from 'test/mocks/profileTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const INITIAL_STATE = {
  profileTypes: {
    list: [],
  },
};

describe('data types actions ', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  describe('setProfileTypes', () => {
    it('test setProfileTypes action sets the correct type', () => {
      const action = setProfileTypes(PROFILE_TYPES_OK_PAGE_1.payload);
      expect(action.type).toEqual(SET_PROFILE_TYPES);
    });
  });

  describe('test fetchProfileTypes', () => {
    it('fetchProfileTypes calls fetchProfileTypes and setPage actions', (done) => {
      store.dispatch(fetchProfileTypes()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual(SET_PROFILE_TYPES);
        expect(actions[1].type).toEqual(SET_PAGE);
        done();
      });
    });

    it('profileTypes is defined and properly valued', (done) => {
      store.dispatch(fetchProfileTypes()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.profileTypes).toHaveLength(2);
        const profileType = actionPayload.profileTypes[0];
        expect(profileType).toHaveProperty('name', 'Default User Profile');
        expect(profileType).toHaveProperty('code', 'PFL');
        expect(profileType).toHaveProperty('status', 'ok');
        done();
      });
    });
  });
});
