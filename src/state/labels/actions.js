import { initialize } from 'redux-form';
import { addErrors } from '@entando/messages';

import { getLabels, getLabel, putLabel, postLabel, deleteLabel } from 'api/labels';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { SET_LABELS, UPDATE_LABEL, REMOVE_LABEL, SET_ACTIVE_TAB } from 'state/labels/types';
import { history, ROUTE_LABELS_AND_LANGUAGES } from 'app-init/router';

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

// thunks

export const fetchLabels = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('systemLabels'));
    getLabels(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setLabels(json.payload));
          dispatch(toggleLoading('systemLabels'));
          dispatch(setPage(json.metaData));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
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
          dispatch(initialize('label', json.payload));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
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
        }
        resolve();
      });
    }).catch(() => {});
  })
);
