import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

import { getLabels, getLabel, putLabel, postLabel, deleteLabel } from 'api/labels';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { SET_LABELS, UPDATE_LABEL, REMOVE_LABEL, SET_ACTIVE_TAB, SET_SELECTED_LABEL, SET_SEARCH_TERM, SET_LABEL_FILTERS } from 'state/labels/types';
import { history, ROUTE_LABELS_AND_LANGUAGES } from 'app-init/router';
import { getLabelFilters } from 'state/labels/selectors';


export const setLabels = labels => ({
  type: SET_LABELS,
  payload: {
    labels,
  },
});

export const updateLabelSync = label => ({
  type: UPDATE_LABEL,
  payload: {
    label,
  },
});

export const removeLabelSync = labelCode => ({
  type: REMOVE_LABEL,
  payload: {
    labelCode,
  },
});

export const setActiveTab = activeTab => ({
  type: SET_ACTIVE_TAB,
  payload: {
    activeTab,
  },
});

export const setLabelFilters = filters => ({
  type: SET_LABEL_FILTERS,
  payload: filters,
});

export const setSelectedLabel = label => ({
  type: SET_SELECTED_LABEL,
  payload: label,
});

export const setSearchTerm = searchTerm => ({
  type: SET_SEARCH_TERM,
  payload: {
    searchTerm,
  },
});

// thunks

export const fetchLabels = (page = { page: 1, pageSize: 10 }) => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('systemLabels'));

    const filters = getLabelFilters(getState());
    const params = filters && filters.keyword ? convertToQueryString({
      formValues: { key: filters.keyword },
      operators: { key: FILTER_OPERATORS.LIKE },
    }) : '';

    getLabels(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setLabels(json.payload));
          dispatch(toggleLoading('systemLabels'));
          dispatch(setPage(json.metaData));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(toggleLoading('systemLabels'));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchLabel = labelkey => dispatch => (
  new Promise((resolve) => {
    getLabel(labelkey).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedLabel(json.payload));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const updateLabel = label => dispatch => (
  new Promise((resolve) => {
    putLabel(label).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(updateLabelSync(label));
          dispatch(setActiveTab('labels'));
          history.push(ROUTE_LABELS_AND_LANGUAGES);
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const createLabel = label => dispatch => (
  new Promise((resolve) => {
    postLabel(label).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(updateLabelSync(label));
          dispatch(setActiveTab('labels'));
          history.push(ROUTE_LABELS_AND_LANGUAGES);
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const removeLabel = labelCode => dispatch => (
  new Promise((resolve) => {
    deleteLabel(labelCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeLabelSync(labelCode));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
