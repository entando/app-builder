import { SET_SELECTED_DE_EXTRA_FILTER, SET_DE_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/types';
import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/const';

export const setSelectedDEExtraFilter = digitalExchangeExtraFilter => ({
  type: SET_SELECTED_DE_EXTRA_FILTER,
  payload: {
    digitalExchangeExtraFilter,
  },
});

export const setDEExtraFilters = digitalExchangeExtraFilters => ({
  type: SET_DE_EXTRA_FILTERS,
  payload: {
    digitalExchangeExtraFilters,
  },
});

export const fetchDEExtraFilters = () => dispatch => (
  new Promise((resolve) => {
    dispatch(setDEExtraFilters(Object.keys(DE_COMPONENTS_EXTRA_FILTERS)));
    resolve();
  })
);
