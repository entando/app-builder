
import { getECRExtraFilters, getSelectedECRExtraFilter } from 'state/component-repository/extra-filters/selectors';

import { ECR_COMPONENTS_EXTRA_FILTERS } from 'state/component-repository/extra-filters/const';

const list = Object.keys(ECR_COMPONENTS_EXTRA_FILTERS);

const MOCK_STATE = {
  componentRepositoryExtraFilters: {
    list,
    selected: list[0],
  },
};

describe('state/component-repository/extra-filters/selectors', () => {
  it('getDEgetECRExtraFilters(state) returns the componentRepositoryExtraFilters object', () => {
    const componentRepositoryExtraFilters = getECRExtraFilters(MOCK_STATE);
    expect(componentRepositoryExtraFilters).toBe(MOCK_STATE.componentRepositoryExtraFilters);
  });

  it('getSelectedECRExtraFilter(state) returns the selected object', () => {
    const selected = getSelectedECRExtraFilter(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.componentRepositoryExtraFilters.selected);
  });
});
