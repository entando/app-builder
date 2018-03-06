
import { addErrors, clearErrors } from 'state/errors/actions';
import reducer from 'state/errors/reducer';

const ERRORS = [
  'Error message 1',
  'Error message 2',
];


describe('state/errors/reducer', () => {
  let state;
  beforeEach(() => {
    state = reducer();
  });

  describe('default state', () => {
    it('should be an array', () => {
      expect(state).toBeDefined();
      expect(Array.isArray(state)).toBe(true);
    });
  });

  describe('on action addErrors', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, addErrors(ERRORS));
    });
    it('should be the passed errors array', () => {
      expect(newState).toEqual(ERRORS);
    });
  });

  describe('on action clearErrors', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, addErrors(ERRORS));
      newState = reducer(state, clearErrors());
    });
    it('should be an empty array', () => {
      expect(newState).toEqual([]);
    });
  });
});
