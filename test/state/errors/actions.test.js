import { isFSA } from 'flux-standard-action';
import { addErrors, clearErrors } from 'state/errors/actions';
import { ADD_ERRORS, CLEAR_ERRORS } from 'state/errors/types';

const ERRORS = [
  'Error message 1',
  'Error message 2',
];

describe('state/errors/actions', () => {
  describe('addErrors', () => {
    let action;
    beforeEach(() => {
      action = addErrors(ERRORS);
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('is of type ADD_ERRORS', () => {
      expect(action.type).toBe(ADD_ERRORS);
    });
    it('defines the "errors" payload property', () => {
      expect(action.payload.errors).toBe(ERRORS);
    });
  });

  describe('clearErrors', () => {
    let action;
    beforeEach(() => {
      action = clearErrors();
    });
    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });
    it('is of type CLEAR_ERRORS', () => {
      expect(action.type).toBe(CLEAR_ERRORS);
    });
  });
});
