import reducer from 'state/api/reducer';
import { setApi } from 'state/api/actions';

let defaultState;

describe('api reducer', () => {
  beforeEach(() => {
    defaultState = reducer();
  });

  it('should return an object', () => {
    expect(typeof defaultState).toBe('object');
    expect(defaultState).toHaveProperty('domain', null);
    expect(defaultState).toHaveProperty('useMocks', true);
  });

  describe('after action setApi', () => {
    describe('domain', () => {
      it('should assign the domain status', () => {
        const state = reducer(defaultState, setApi({ domain: '//domain.com', useMocks: true }));
        expect(state).toHaveProperty('domain', '//domain.com');
      });

      it('should not assign the domain status if it is not a valid domain', () => {
        const state = reducer(defaultState, setApi({ domain: 'domain', useMocks: true }));
        expect(state).toHaveProperty('domain', null);
      });

      it('should not assign the domain status if the double slashes are not specified', () => {
        const state = reducer(defaultState, setApi({ domain: 'domain.com', useMocks: true }));
        expect(state).toHaveProperty('domain', null);
      });

      it('should not assign the domain status if there is a trailing slash', () => {
        const state = reducer(defaultState, setApi({ domain: '//domain.com/', useMocks: true }));
        expect(state).toHaveProperty('domain', null);
      });

      it('should assign the domain status for 3rd level domains', () => {
        const state = reducer(defaultState, setApi({ domain: '//sub.domain.com', useMocks: true }));
        expect(state).toHaveProperty('domain', '//sub.domain.com');
      });

      it('should assign the domain status with explicit protocol', () => {
        const state = reducer(defaultState, setApi({ domain: 'http://domain.com', useMocks: true }));
        expect(state).toHaveProperty('domain', 'http://domain.com');
      });

      it('should assign the domain status with explicit https protocol', () => {
        const state = reducer(defaultState, setApi({ domain: 'https://domain.com', useMocks: true }));
        expect(state).toHaveProperty('domain', 'https://domain.com');
      });

      it('should assign the domain status if there is up to one directory after the domain name', () => {
        const state = reducer(defaultState, setApi({ domain: '//domain.com/entando-sample', useMocks: true }));
        expect(state).toHaveProperty('domain', '//domain.com/entando-sample');
      });
    });

    describe('useMocks', () => {
      it('should assign the useMocks status', () => {
        const state = reducer(defaultState, setApi({ domain: '//domain.com', useMocks: false }));
        expect(state).toHaveProperty('useMocks', false);
      });

      it('should assign the useMocks status only if it is a boolean', () => {
        const state = reducer(defaultState, setApi({ domain: '//domain.com', useMocks: 'false' }));
        expect(state).toHaveProperty('useMocks', true);
      });

      it('should assign the useMocks status to false only if a valid domain is specified', () => {
        const state = reducer(defaultState, setApi({ domain: 'domain', useMocks: 'false' }));
        expect(state).toHaveProperty('useMocks', true);
      });
    });
  });
});
