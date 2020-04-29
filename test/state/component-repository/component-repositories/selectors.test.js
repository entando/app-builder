import { LIST_COMPONENT_REPOSITORIES_OK } from 'test/mocks/component-repository/componentRepositories';

import { getComponentRepositories, getSelectedComponentRepository, getComponentRepositoryList } from 'state/component-repository/component-repositories/selectors';

const list = LIST_COMPONENT_REPOSITORIES_OK;

const MOCK_STATE = {
  componentRepositories: {
    list,
    selected: list[0],
  },
};

describe('state/component-repository/component-repositories/selectors', () => {
  it('getComponentRepositories(state) returns the componentRepositories object', () => {
    const componentRepositories = getComponentRepositories(MOCK_STATE);
    expect(componentRepositories).toBe(MOCK_STATE.componentRepositories);
  });

  it('getSelectedComponentRepository(state) returns the selected object', () => {
    const selected = getSelectedComponentRepository(MOCK_STATE);
    expect(selected).toBe(MOCK_STATE.componentRepositories.selected);
  });

  it('verify getComponentRepositoryList selector', () => {
    expect(getComponentRepositoryList(MOCK_STATE)).toEqual(MOCK_STATE.componentRepositories.list);
  });
});
