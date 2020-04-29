import { createSelector } from 'reselect';

export const getComponentRepositories = state => state.componentRepositories;

export const getComponentRepositoryList = createSelector(
  getComponentRepositories,
  componentRepositories => componentRepositories.list,
);

export const getSelectedComponentRepository = createSelector(
  [getComponentRepositories],
  componentRepositories => componentRepositories.selected,
);
