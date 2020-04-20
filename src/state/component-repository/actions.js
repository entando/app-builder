import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { getECRFilters } from 'state/component-repository/components/selectors';
import { getSelectedECRCategory } from 'state/component-repository/categories/selectors';
import { setSelectedECRCategory } from 'state/component-repository/categories/actions';
import { setSelectedECRExtraFilter } from 'state/component-repository/extra-filters/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/component-repository/categories/const';
import { ECR_COMPONENTS_EXTRA_FILTERS } from 'state/component-repository/extra-filters/const';
import { fetchECRComponents, setECRFilter } from 'state/component-repository/components/actions';

export const navigateECRCategory = (category, paginationMetadata) => (dispatch, getState) => {
  dispatch(setSelectedECRCategory(category));
  if (category !== ALL_CATEGORIES_CATEGORY) {
    const filter = {
      formValues: { type: category ? [category] : [] },
      operators: { type: FILTER_OPERATORS.EQUAL },
    };
    dispatch(setECRFilter(filter, category));
  }
  const filters = getECRFilters(getState());
  const params = filters[category] ? convertToQueryString(filters[category]) : '';
  return dispatch(fetchECRComponents(paginationMetadata, params));
};

export const navigateECRExtraTab = (extraFilter, paginationMetadata) => (dispatch) => {
  dispatch(setSelectedECRExtraFilter(extraFilter));
  const params = convertToQueryString(ECR_COMPONENTS_EXTRA_FILTERS[extraFilter]);
  return dispatch(fetchECRComponents(paginationMetadata, params));
};


const applyFilter = (filter, paginationMetadata) => (dispatch, getState) => {
  const selectedCategory = getSelectedECRCategory(getState());
  dispatch(setECRFilter(filter, selectedCategory));
  const filters = getECRFilters(getState());
  const params = filters[selectedCategory] ? convertToQueryString(filters[selectedCategory]) : '';
  return dispatch(fetchECRComponents(paginationMetadata, params));
};

export const filterByECRCategories = (categories, paginationMetadata) => {
  const filter = {
    formValues: { type: categories },
    operators: { type: FILTER_OPERATORS.EQUAL },
  };
  return applyFilter(filter, paginationMetadata);
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

export const filterBySearch = (keyword, paginationMetadata) => {
  const filter = {
    formValues: { name: keyword, description: keyword },
    operators: { name: FILTER_OPERATORS.LIKE, description: FILTER_OPERATORS.LIKE },
  };
  return applyFilter(filter, paginationMetadata);
};
