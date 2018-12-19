import {
  SET_DE_COMPONENTS,
  SET_SELECTED_DE_COMPONENT,
  SET_DE_COMPONENT_LIST_VIEW_MODE,
  SET_DE_FILTERS,
  ADD_DE_FILTER,
} from 'state/digital-exchange/components/types';
import { addErrors } from '@entando/messages';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { toggleLoading } from 'state/loading/actions';
import { getDEFilters } from 'state/digital-exchange/components/selectors';
import { getDEComponent, getDEComponents } from 'api/digital-exchange/components';
import { setPage } from 'state/pagination/actions';


export const setSelectedDEComponent = digitalExchangeComponent => ({
  type: SET_SELECTED_DE_COMPONENT,
  payload: {
    digitalExchangeComponent,
  },
});

export const setDEComponents = digitalExchangeComponents => ({
  type: SET_DE_COMPONENTS,
  payload: {
    digitalExchangeComponents,
  },
});

export const setDEFilters = digitalExchangeFilters => ({
  type: SET_DE_FILTERS,
  payload: {
    digitalExchangeFilters,
  },
});

export const resetDEFilters = () => setDEFilters({});

export const addDEFilter = digitalExchangeFilter => ({
  type: ADD_DE_FILTER,
  payload: {
    digitalExchangeFilter,
  },
});

export const setDEComponentListViewMode = componentListViewMode => ({
  type: SET_DE_COMPONENT_LIST_VIEW_MODE,
  payload: {
    componentListViewMode,
  },
});

export const showDEComponentsByCategory = (category, page) => (dispatch, getState) => (
  new Promise((resolve) => {
    const feature = 'digital-exchange/components';
    dispatch(toggleLoading(feature));
    dispatch(resetDEFilters());
    const filter = {
      formValues: { type: category ? [category] : [] },
      operators: { type: FILTER_OPERATORS.EQUAL },
    };
    dispatch(addDEFilter(filter));
    const filters = getDEFilters(getState());
    const params = convertToQueryString(filters);
    getDEComponents(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setDEComponents(data.payload));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        dispatch(toggleLoading(feature));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDEComponents = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('digital-exchange/components'));
    getDEComponents(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setDEComponents(data.payload));
          dispatch(toggleLoading('digital-exchange/components'));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('digital-exchange/components'));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDEComponentDetail = id => dispatch => (
  new Promise((resolve) => {
    getDEComponent(id).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedDEComponent(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
