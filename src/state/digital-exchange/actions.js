import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { getDEFilters } from 'state/digital-exchange/components/selectors';
import { getSelectedDECategory } from 'state/digital-exchange/categories/selectors';
import { setSelectedDECategory } from 'state/digital-exchange/categories/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';
import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/components/const';
import { fetchDEComponents, setDEFilter } from 'state/digital-exchange/components/actions';

export const navigateDECategory = (category, paginationMetadata) => (dispatch, getState) => {
  dispatch(setSelectedDECategory(category));
  if (category !== ALL_CATEGORIES_CATEGORY) {
    const filter = {
      formValues: { type: category ? [category] : [] },
      operators: { type: FILTER_OPERATORS.EQUAL },
    };
    dispatch(setDEFilter(filter, category));
  }
  const filters = getDEFilters(getState());
  const params = filters[category] ? convertToQueryString(filters[category]) : '';
  return dispatch(fetchDEComponents(paginationMetadata, params));
};


export const navigateDEExtraTab = (extraFilter, paginationMetadata) => (dispatch) => {
  const params = convertToQueryString(DE_COMPONENTS_EXTRA_FILTERS[extraFilter]);
  return dispatch(fetchDEComponents(paginationMetadata, params));
};


const applyFilter = (filter, paginationMetadata) => (dispatch, getState) => {
  const selectedCategory = getSelectedDECategory(getState());
  dispatch(setDEFilter(filter, selectedCategory));
  const filters = getDEFilters(getState());
  const params = filters[selectedCategory] ? convertToQueryString(filters[selectedCategory]) : '';
  return dispatch(fetchDEComponents(paginationMetadata, params));
};

export const filterByDECategories = (categories, paginationMetadata) => {
  const filter = {
    formValues: { type: categories },
    operators: { type: FILTER_OPERATORS.EQUAL },
  };
  return applyFilter(filter, paginationMetadata);
};

export const filterByDigitalExchanges = (digitalExchanges, paginationMetadata) => {
  const filter = {
    formValues: { digitalExchangeId: digitalExchanges },
    operators: { digitalExchangeId: FILTER_OPERATORS.EQUAL },
  };
  return applyFilter(filter, paginationMetadata);
};

export const filterByRating = (rating, paginationMetadata) => {
  const filter = {
    formValues: { rating },
    operators: { rating: FILTER_OPERATORS.GREATER_THAN },
  };
  return applyFilter(filter, paginationMetadata);
};
