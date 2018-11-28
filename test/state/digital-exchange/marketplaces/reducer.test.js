import reducer from 'state/digital-exchange/marketplaces/reducer';
import {
  setSelectedDEMarketplace,
  setDEMarketplaces,
} from 'state/digital-exchange/marketplaces/actions';
import {
  LIST_DE_MARKETPLACES_OK,
  GET_DE_MARKETPLACE_OK,
} from 'test/mocks/digital-exchange/marketplaces';


describe('digital-exchange/marketplaces/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setSelectedDEMarketplace', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedDEMarketplace(GET_DE_MARKETPLACE_OK));
    });

    it('should define the marketplace payload', () => {
      expect(newState).toHaveProperty('selected', GET_DE_MARKETPLACE_OK);
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setDEMarketplaces', () => {
      it('should define marketplace list', () => {
        const newState = reducer({}, setDEMarketplaces(LIST_DE_MARKETPLACES_OK));
        expect(newState.list).toHaveLength(3);
      });
    });
  });
});
