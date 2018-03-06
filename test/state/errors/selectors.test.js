
import { getErrors } from 'state/errors/selectors';

const ERRORS = [
  'Error message 1',
  'Error message 2',
];

const STATE = {
  errors: ERRORS,
};


describe('state/errors/selectors', () => {
  describe('getErrors', () => {
    it('returns the errors state', () => {
      expect(getErrors(STATE)).toEqual(ERRORS);
    });
  });
});
