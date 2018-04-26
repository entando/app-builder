import reducer from 'state/integrations/reducer';
import { setApis, setPlugins } from 'state/integrations/actions';


describe('state/alerts/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(INITIAL_STATE).toBeInstanceOf(Object);
    expect(INITIAL_STATE).toHaveProperty('apis', 0);
    expect(INITIAL_STATE).toHaveProperty('plugins', 0);
  });

  describe('after SET_APIS', () => {
    it('new apis value is returned ', () => {
      const newState = reducer(INITIAL_STATE, setApis(3));
      expect(newState).toHaveProperty('apis', 3);
      expect(newState).toHaveProperty('plugins', 0);
    });
  });

  describe('after SET_PLUGINS', () => {
    it('new plugins value is returned ', () => {
      const newState = reducer(INITIAL_STATE, setPlugins(2));
      expect(newState).toHaveProperty('apis', 0);
      expect(newState).toHaveProperty('plugins', 2);
    });
  });
});
