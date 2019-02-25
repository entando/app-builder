import reducer from 'state/digital-exchange/digital-exchanges/reducer';
import {
  setSelectedDigitalExchange,
  setDigitalExchanges,
  removeDigitalExchange,
} from 'state/digital-exchange/digital-exchanges/actions';
import {
  LIST_DIGITAL_EXCHANGES_OK,
  DIGITAL_EXCHANGE_OK,
} from 'test/mocks/digital-exchange/digitalExchanges';


describe('digital-exchange/marketplaces/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setSelectedDigitalExchange', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedDigitalExchange(DIGITAL_EXCHANGE_OK));
    });

    it('should define the marketplace payload', () => {
      expect(newState).toHaveProperty('selected', DIGITAL_EXCHANGE_OK);
    });

    describe('after action removeDigitalExchange', () => {
      it('should not remove the marketplace if the ID does not match', () => {
        newState = reducer(newState, removeDigitalExchange('madeup'));
        expect(newState).toHaveProperty('selected', DIGITAL_EXCHANGE_OK);
      });

      it('should remove the marketplace if the ID matches', () => {
        newState = reducer(newState, removeDigitalExchange(DIGITAL_EXCHANGE_OK.id));
        expect(newState).toHaveProperty('selected', {});
      });
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setDigitalExchanges', () => {
      let newState;

      it('should define marketplace list', () => {
        newState = reducer({}, setDigitalExchanges(LIST_DIGITAL_EXCHANGES_OK));
        expect(newState.list).toHaveLength(3);
      });

      describe('after action removeDigitalExchange', () => {
        it('should not remove the marketplace if the ID does not match', () => {
          newState = reducer(newState, removeDigitalExchange('madeup'));
          expect(newState.list).toHaveLength(3);
          expect(newState.list[0]).toHaveProperty('id', 'entando');
          expect(newState.list[1]).toHaveProperty('id', 'redhat');
          expect(newState.list[2]).toHaveProperty('id', 'leonardo');
        });

        it('should remove the marketplace if the ID matches', () => {
          newState = reducer(newState, removeDigitalExchange('redhat'));
          expect(newState.list).toHaveLength(2);
          expect(newState.list[0]).toHaveProperty('id', 'entando');
          expect(newState.list[1]).toHaveProperty('id', 'leonardo');
        });
      });
    });
  });
});
