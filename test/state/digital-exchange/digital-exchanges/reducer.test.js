import reducer from 'state/digital-exchange/digital-exchanges/reducer';
import {
  setSelectedDigitalExchange,
  setDigitalExchanges,
} from 'state/digital-exchange/digital-exchanges/actions';
import {
  LIST_DIGITAL_EXCHANGES_OK,
  DIGITAL_EXCHANGE_OK,
} from 'test/mocks/digital-exchange/digitalExchanges';


describe('digital-exchange/digital-exchanges/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setSelectedDigitalExchange', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedDigitalExchange(DIGITAL_EXCHANGE_OK));
    });

    it('should define the digital exchange payload', () => {
      expect(newState).toHaveProperty('selected', DIGITAL_EXCHANGE_OK);
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action setDigitalExchanges', () => {
      it('should define digital exchange list', () => {
        const newState = reducer({}, setDigitalExchanges(LIST_DIGITAL_EXCHANGES_OK));
        expect(newState.list).toHaveLength(3);
      });
    });
  });
});
