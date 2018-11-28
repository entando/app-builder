import { LIST_DE_MARKETPLACES_OK } from 'test/mocks/digital-exchange/marketplaces';

import { getDEMarketplaces, getDEMarketplaceSelected, getDEMarketplaceList } from 'state/digital-exchange/marketplaces/selectors';

const list = LIST_DE_MARKETPLACES_OK;

const MOCK_STATE = {
  digitalExchangeMarketplaces: {
    list,
    selected: list[0],
  },
};

describe('state/digital-exchange/marketplaces/selectors', () => {
  it('getDEMarketplaces(state) returns the digitalExchangeMarketplaces object', () => {
    const digitalExchangeMarketplaces = getDEMarketplaces(MOCK_STATE);
    expect(digitalExchangeMarketplaces).toBe(MOCK_STATE.digitalExchangeMarketplaces);
  });
  it('getDEMarketplaceSelected(state) returns the selected object', () => {
    const selected = getDEMarketplaceSelected(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.digitalExchangeMarketplaces.selected);
  });
  it('verify getDEMarketplaceList selector', () => {
    expect(getDEMarketplaceList(MOCK_STATE)).toEqual(MOCK_STATE.digitalExchangeMarketplaces.list);
  });
});
