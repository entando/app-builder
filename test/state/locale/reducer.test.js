import reducer from 'state/locale/reducer';
import { setLanguage } from 'state/locale/actions';

const LOCALE = 'en';

describe('state/locale/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('string');
  });

  describe('after action SET_LOCALE', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, setLanguage(LOCALE));
    });
    it('should define locale', () => {
      expect(state).toEqual('en');
    });
  });
});
