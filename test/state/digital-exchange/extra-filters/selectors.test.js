
import { getDEExtraFilters, getSelectedDEExtraFilter } from 'state/digital-exchange/extra-filters/selectors';

import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/const';

const list = Object.keys(DE_COMPONENTS_EXTRA_FILTERS);

const MOCK_STATE = {
  digitalExchangeExtraFilters: {
    list,
    selected: list[0],
  },
};

describe('state/digital-exchange/extra-filters/selectors', () => {
  it('getDEgetDEExtraFilters(state) returns the digitalExchangeExtraFilters object', () => {
    const digitalExchangeExtraFilters = getDEExtraFilters(MOCK_STATE);
    expect(digitalExchangeExtraFilters).toBe(MOCK_STATE.digitalExchangeExtraFilters);
  });

  it('getSelectedDEExtraFilter(state) returns the selected object', () => {
    const selected = getSelectedDEExtraFilter(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.digitalExchangeExtraFilters.selected);
  });
});
