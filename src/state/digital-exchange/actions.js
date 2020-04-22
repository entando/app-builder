import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { getDEFilters } from 'state/digital-exchange/components/selectors';
import { getSelectedDECategory } from 'state/digital-exchange/categories/selectors';
import { setSelectedDECategory } from 'state/digital-exchange/categories/actions';
import { setSelectedDEExtraFilter } from 'state/digital-exchange/extra-filters/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';
import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/const';
import { fetchDEComponents, setDEFilter } from 'state/digital-exchange/components/actions';
import { getSelectedDEExtraFilter } from './extra-filters/selectors';

const genFilterParams = (filter, getState) => {
  const filters = getDEFilters(getState());
  const selectedExtraFilter = getSelectedDEExtraFilter(getState());
  const merge = {
    formValues: {
      ...(filters[filter] && filters[filter].formValues),
      ...(selectedExtraFilter && DE_COMPONENTS_EXTRA_FILTERS[selectedExtraFilter].formValues),
    },
    operators: {
      ...(filters[filter] && filters[filter].operators),
      ...(selectedExtraFilter && DE_COMPONENTS_EXTRA_FILTERS[selectedExtraFilter].operators),
    },
  };
  return convertToQueryString(merge);
};

export const navigateDECategory = (category, paginationMetadata) => (dispatch, getState) => {
  dispatch(setSelectedDECategory(category));
  if (category !== ALL_CATEGORIES_CATEGORY) {
    const filter = {
      formValues: { type: category ? [category] : [] },
      operators: { type: FILTER_OPERATORS.EQUAL },
    };
    dispatch(setDEFilter(filter, category));
  }
  return dispatch(fetchDEComponents(
    paginationMetadata,
    genFilterParams(category, getState),
  ));
};

export const navigateDEExtraTab = (extraFilter, paginationMetadata) => (dispatch, getState) => {
  dispatch(setSelectedDEExtraFilter(extraFilter));
  const selectedCategory = getSelectedDECategory(getState());
  return dispatch(fetchDEComponents(
    paginationMetadata,
    genFilterParams(selectedCategory, getState),
  ));
};


const applyFilter = (filter, paginationMetadata) => (dispatch, getState) => {
  const selectedCategory = getSelectedDECategory(getState());
  dispatch(setDEFilter(filter, selectedCategory));
  return dispatch(fetchDEComponents(
    paginationMetadata,
    genFilterParams(selectedCategory, getState),
  ));
};

export const filterByDECategories = (categories, paginationMetadata) => {
  const filter = {
    formValues: { type: categories },
    operators: { type: FILTER_OPERATORS.EQUAL },
  };
  return applyFilter(filter, paginationMetadata);
};

export const fetchDEComponentsFiltered = paginationMetadata => (dispatch, getState) => {
  const selectedCategory = getSelectedDECategory(getState());
  return dispatch(fetchDEComponents(
    paginationMetadata,
    genFilterParams(selectedCategory, getState),
  ));
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

export const resetSearchFilter = paginationMetadata => (dispatch, getState) => {
  const selectedCategory = getSelectedDECategory(getState());
  dispatch(setDEFilter(
    { formValues: { name: null }, operators: { name: null } },
    selectedCategory,
  ));
  dispatch(setDEFilter(
    { formValues: { description: null }, operators: { description: null } },
    selectedCategory,
  ));
  dispatch(setDEFilter({ formValues: { id: null }, operators: { id: null } }, selectedCategory));
  dispatch(setDEFilter(
    { formValues: { version: null }, operators: { version: null } },
    selectedCategory,
  ));
  return dispatch(fetchDEComponents(
    paginationMetadata,
    genFilterParams(selectedCategory, getState),
  ));
};

export const filterBySearch = (keyword, paginationMetadata) => {
  let filter = null;
  if (keyword) {
    filter = {
      formValues: {
        name: keyword,
        description: keyword,
        id: keyword,
        version: keyword,
      },
      operators: {
        name: FILTER_OPERATORS.LIKE,
        description: FILTER_OPERATORS.LIKE,
        version: FILTER_OPERATORS.LIKE,
        id: FILTER_OPERATORS.LIKE,
      },
    };
    return applyFilter(filter, paginationMetadata);
  }
  return resetSearchFilter(paginationMetadata);
};
