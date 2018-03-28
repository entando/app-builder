import { getLabels, putLabel, postLabel, deleteLabel } from 'api/labels';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { SET_LABELS, UPDATE_LABEL, REMOVE_LABEL } from 'state/labels/types';

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

export const removeLabelSync = labelKey => ({
  type: REMOVE_LABEL,
  payload: {
    labelKey,
  },
});


// thunks

export const fetchLabels = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    getLabels(page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setLabels(json.payload));
          dispatch(setPage(json.metaData));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const updateLabel = label => dispatch => (
  new Promise((resolve) => {
    putLabel(label).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(updateLabelSync(label));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const createLabel = label => dispatch => (
  new Promise((resolve) => {
    postLabel(label).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(updateLabelSync(label));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const removeLabel = label => dispatch => (
  new Promise((resolve) => {
    deleteLabel(label).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeLabelSync(label));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);
