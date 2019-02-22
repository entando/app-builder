import { LIST_DIGITAL_EXCHANGES_OK } from 'test/mocks/digital-exchange/digitalExchanges';

import { getDigitalExchanges, getSelectedDigitalExchange, getDigitalExchangeList } from 'state/digital-exchange/digital-exchanges/selectors';

const list = LIST_DIGITAL_EXCHANGES_OK;

const MOCK_STATE = {
  digitalExchanges: {
    list,
    selected: list[0],
  },
};

describe('state/digital-exchange/digital-exchanges/selectors', () => {
  it('getDigitalExchanges(state) returns the digitalExchanges object', () => {
    const digitalExchanges = getDigitalExchanges(MOCK_STATE);
    expect(digitalExchanges).toBe(MOCK_STATE.digitalExchanges);
  });

  it('getSelectedDigitalExchange(state) returns the selected object', () => {
    const selected = getSelectedDigitalExchange(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.digitalExchanges.selected);
  });

  it('verify getDigitalExchangeList selector', () => {
    expect(getDigitalExchangeList(MOCK_STATE)).toEqual(MOCK_STATE.digitalExchanges.list);
  });
});
