import { SET_SELECTED_ECR_EXTRA_FILTER, SET_ECR_EXTRA_FILTERS } from 'state/component-repository/extra-filters/types';
import { ECR_COMPONENTS_EXTRA_FILTERS } from 'state/component-repository/extra-filters/const';

// eslint-disable-next-line import/prefer-default-export
export const setSelectedECRExtraFilter = componentRepositoryExtraFilter => ({
  type: SET_SELECTED_ECR_EXTRA_FILTER,
  payload: {
    componentRepositoryExtraFilter,
  },
});

export const setECRExtraFilters = componentRepositoryExtraFilters => ({
  type: SET_ECR_EXTRA_FILTERS,
  payload: {
    componentRepositoryExtraFilters,
  },
});

export const fetchECRExtraFilters = () => dispatch => (
  new Promise((resolve) => {
    dispatch(setECRExtraFilters(Object.keys(ECR_COMPONENTS_EXTRA_FILTERS)));
    resolve();
  })
);
