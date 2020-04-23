import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { getECRFilters } from 'state/component-repository/components/selectors';
import { getSelectedECRCategory } from 'state/component-repository/categories/selectors';
import { setSelectedECRCategory } from 'state/component-repository/categories/actions';
import { setSelectedECRExtraFilter } from 'state/component-repository/extra-filters/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/component-repository/categories/const';
import { ECR_COMPONENTS_EXTRA_FILTERS } from 'state/component-repository/extra-filters/const';
import { fetchECRComponents, setECRFilter, clearECRSearchFilter } from 'state/component-repository/components/actions';
import { getSelectedECRExtraFilter } from 'state/component-repository/extra-filters/selectors';

const genFilterParams = (filter, getState) => {
  const filters = getECRFilters(getState());
  const selectedExtraFilter = getSelectedECRExtraFilter(getState());
  const merge = {
    formValues: {
      ...(filters[filter] && filters[filter].formValues),
      ...(selectedExtraFilter && ECR_COMPONENTS_EXTRA_FILTERS[selectedExtraFilter].formValues),
    },
    operators: {
      ...(filters[filter] && filters[filter].operators),
      ...(selectedExtraFilter && ECR_COMPONENTS_EXTRA_FILTERS[selectedExtraFilter].operators),
    },
  };
  return convertToQueryString(merge);
};

export const navigateECRCategory = (category, paginationMetadata) => (dispatch, getState) => {
  dispatch(setSelectedECRCategory(category));
  if (category !== ALL_CATEGORIES_CATEGORY) {
    const filter = {
      formValues: { type: category ? [category] : [] },
      operators: { type: FILTER_OPERATORS.EQUAL },
    };
    dispatch(setECRFilter(filter, category));
  }
  return dispatch(fetchECRComponents(
    paginationMetadata,
    genFilterParams(category, getState),
  ));
};

export const navigateECRExtraTab = (extraFilter, paginationMetadata) => (dispatch, getState) => {
  dispatch(setSelectedECRExtraFilter(extraFilter));
  const selectedCategory = getSelectedECRCategory(getState());
  return dispatch(fetchECRComponents(
    paginationMetadata,
    genFilterParams(selectedCategory, getState),
  ));
};


const applyFilter = (filter, paginationMetadata) => (dispatch, getState) => {
  const selectedCategory = getSelectedECRCategory(getState());
  dispatch(setECRFilter(filter, selectedCategory));
  return dispatch(fetchECRComponents(
    paginationMetadata,
    genFilterParams(selectedCategory, getState),
  ));
};

export const filterByECRCategories = (categories, paginationMetadata) => {
  const filter = {
    formValues: { type: categories },
    operators: { type: FILTER_OPERATORS.EQUAL },
  };
  return applyFilter(filter, paginationMetadata);
};

export const fetchECRComponentsFiltered = paginationMetadata => (dispatch, getState) => {
  const selectedCategory = getSelectedECRCategory(getState());
  return dispatch(fetchECRComponents(
    paginationMetadata,
    genFilterParams(selectedCategory, getState),
  ));
};

export const filterByComponentRepositories = (componentRepositories, paginationMetadata) => {
  const filter = {
    formValues: { digitalExchangeId: componentRepositories },
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
  const selectedCategory = getSelectedECRCategory(getState());
  dispatch(clearECRSearchFilter(selectedCategory));
  return dispatch(fetchECRComponents(
    paginationMetadata,
    genFilterParams(selectedCategory, getState),
  ));
};

export const filterBySearch = (keyword, paginationMetadata) => {
  if (keyword) {
    const filter = {
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
