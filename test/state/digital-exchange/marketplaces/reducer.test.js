import reducer from 'state/digital-exchange/marketplaces/reducer';
import {
  setSelectedDEMarketplace,
  setDEMarketplaces,
  removeDEMarketplace,
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

    describe('after action removeDEMarketplace', () => {
      it('should not remove the marketplace if the ID does not match', () => {
        newState = reducer(newState, removeDEMarketplace('madeup'));
        expect(newState).toHaveProperty('selected', GET_DE_MARKETPLACE_OK);
      });

      it('should remove the marketplace if the ID matches', () => {
        newState = reducer(newState, removeDEMarketplace(GET_DE_MARKETPLACE_OK.id));
        expect(newState).toHaveProperty('selected', {});
      });
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setDEMarketplaces', () => {
      let newState;

      it('should define marketplace list', () => {
        newState = reducer({}, setDEMarketplaces(LIST_DE_MARKETPLACES_OK));
        expect(newState.list).toHaveLength(3);
      });

      describe('after action removeDEMarketplace', () => {
        it('should not remove the marketplace if the ID does not match', () => {
          newState = reducer(newState, removeDEMarketplace('madeup'));
          expect(newState.list).toHaveLength(3);
          expect(newState.list[0]).toHaveProperty('id', 'entando');
          expect(newState.list[1]).toHaveProperty('id', 'redhat');
          expect(newState.list[2]).toHaveProperty('id', 'leonardo');
        });

        it('should remove the marketplace if the ID matches', () => {
          newState = reducer(newState, removeDEMarketplace('redhat'));
          expect(newState.list).toHaveLength(2);
          expect(newState.list[0]).toHaveProperty('id', 'entando');
          expect(newState.list[1]).toHaveProperty('id', 'leonardo');
        });
      });
    });
  });
});
