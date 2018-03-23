import reducer from 'state/profile-types/reducer';
import { setProfileTypes } from 'state/profile-types/actions';
import { getProfileTypesList } from 'state/profile-types/selectors';
import {
  PROFILE_TYPES_OK,
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPES_NORMALIZED,
} from 'test/mocks/profileTypes';

jest.mock('state/profile-types/selectors', () => ({
  getProfileTypesList: jest.fn(),
}));

getProfileTypesList.mockReturnValue(PROFILE_TYPES_OK);

describe('state/profile-types/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_PROFILE_TYPES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setProfileTypes(PROFILE_TYPES_OK_PAGE_1.payload));
    });

    it('should define the id list payload', () => {
      expect(newState.list).toEqual(PROFILE_TYPES_NORMALIZED.profileTypes.list);
    });

    it('should define the map payload', () => {
      expect(newState.map).toEqual(PROFILE_TYPES_NORMALIZED.profileTypes.map);
    });
  });
});
