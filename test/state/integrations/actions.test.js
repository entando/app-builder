import { isFSA } from 'flux-standard-action';
import { setApis, setPlugins } from 'state/integrations/actions';
import { SET_APIS, SET_PLUGINS } from 'state/integrations/types';

describe('state/plugins/actions', () => {
  let action;

  describe('setApis', () => {
    beforeEach(() => {
      action = setApis(2);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_APIS', () => {
      expect(action).toHaveProperty('type', SET_APIS);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.apis', 2);
    });
  });

  describe('setPlugins', () => {
    beforeEach(() => {
      action = setPlugins(3);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type CLEAR_ALERT', () => {
      expect(action).toHaveProperty('type', SET_PLUGINS);
    });

    it('defines payload property', () => {
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.plugins', 3);
    });
  });
});
