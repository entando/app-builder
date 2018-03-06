import 'test/enzyme-init';
import { getFragment, getFragments } from 'api/fragments';
import { GET_FRAGMENT_OK, LIST_FRAGMENTS_OK, BODY_ERROR } from 'test/mocks/fragments';

const FRAGMENT_CODE = 'myCode';

jest.unmock('api/fragments');

describe('api/fragments', () => {
  describe('getFragment', () => {
    it('returns a promise', () => {
      const filledInput = getFragment(FRAGMENT_CODE);
      expect(typeof filledInput.then === 'function').toBeDefined();
    });

    it('get success response', () => {
      getFragment(FRAGMENT_CODE).then((response) => {
        expect(response).toEqual(GET_FRAGMENT_OK);
      });
    });

    it('get an error response with a not existing fragment code', () => {
      getFragment('BAD').then(() => {}, (error) => {
        expect(error).toEqual(BODY_ERROR);
      });
    });

    it('get error response', () => {
      getFragment().then(() => {}, (error) => {
        expect(error).toEqual(BODY_ERROR);
      });
    });
  });

  describe('getFragments', () => {
    it('returns a promise', () => {
      const filledInput = getFragments();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });

    it('get success response', () => {
      getFragments().then((response) => {
        expect(response).toEqual(LIST_FRAGMENTS_OK);
      });
    });

    it('get error response', () => {
      getFragments().then(() => {}, (error) => {
        expect(error).toEqual(BODY_ERROR);
      });
    });
  });
});
