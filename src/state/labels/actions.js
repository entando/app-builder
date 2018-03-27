import { getLabels, putLabel, postLabel, deleteLabel } from 'api/labels';
import { setPage } from 'state/pagination/actions';
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
      if (response.ok) {
        response.json().then((data) => {
          dispatch(setLabels(data.payload));
          dispatch(setPage(data.metaData));
          resolve();
        });
      } else {
        resolve();
      }
    });
  })
);

export const updateLabel = label => dispatch => (
  new Promise((resolve) => {
    putLabel(label).then((response) => {
      if (response.ok) {
        response.json().then(() => {
          dispatch(updateLabelSync(label));
          resolve();
        });
      } else {
        resolve();
      }
    });
  })
);

export const createLabel = label => dispatch => (
  new Promise((resolve) => {
    postLabel(label).then((response) => {
      if (response.ok) {
        response.json().then(() => {
          dispatch(updateLabelSync(label));
          resolve();
        });
      } else {
        resolve();
      }
    });
  })
);

export const removeLabel = label => dispatch => (
  new Promise((resolve) => {
    deleteLabel(label).then((response) => {
      if (response.ok) {
        response.json().then(() => {
          dispatch(removeLabelSync(label));
          resolve();
        });
      } else {
        resolve();
      }
    });
  })
);
