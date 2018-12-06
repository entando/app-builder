import { LIST_DE_COMPONENTS_OK } from 'test/mocks/digital-exchange/components';

import { getDEComponents, getDEComponentSelected, getDEComponentList } from 'state/digital-exchange/components/selectors';

const list = LIST_DE_COMPONENTS_OK;

const MOCK_STATE = {
  digitalExchangeComponents: {
    list,
    selected: list[0],
  },
};

describe('state/digital-exchange/components/selectors', () => {
  it('getDEComponents(state) returns the digitalExchangeComponents object', () => {
    const digitalExchangeComponents = getDEComponents(MOCK_STATE);
    expect(digitalExchangeComponents).toBe(MOCK_STATE.digitalExchangeComponents);
  });

  it('getDEComponentSelected(state) returns the selected object', () => {
    const selected = getDEComponentSelected(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.digitalExchangeComponents.selected);
  });

  it('verify getDEComponentList selector', () => {
    expect(getDEComponentList(MOCK_STATE)).toEqual(MOCK_STATE.digitalExchangeComponents.list);
  });
});
