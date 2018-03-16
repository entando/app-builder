import 'test/enzyme-init';
import { getProfileTypes } from 'api/profileTypes';
import {
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPES_OK_PAGE_2,
} from 'test/mocks/profileTypes';

jest.unmock('api/profileTypes');
jest.useFakeTimers();

describe('api/profileTypes', () => {
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  describe('getProfileTypes', () => {
    it('returns a promise', () => {
      const filledInput = getProfileTypes();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });

    it('get profile type page 1 as first page', () => {
      expect(getProfileTypes()).resolves.toEqual(PROFILE_TYPES_OK_PAGE_1);
    });

    it('get profile type page 2', () => {
      expect(getProfileTypes(2)).resolves.toEqual(PROFILE_TYPES_OK_PAGE_2);
    });

    it('get profile type page 1 by default', () => {
      expect(getProfileTypes('nopage')).resolves.toEqual(PROFILE_TYPES_OK_PAGE_1);
    });
  });
});
