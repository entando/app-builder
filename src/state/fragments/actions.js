import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';

import {
  getFragment,
  getFragments,
  getFragmentSettings,
  putFragmentSettings,
  deleteFragment,
  postFragment,
  putFragment,
} from 'api/fragments';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { history, ROUTE_FRAGMENT_EDIT, ROUTE_FRAGMENT_LIST } from 'app-init/router';
import {
  SET_SELECTED, SET_PLUGINS, SET_FRAGMENTS,
  REMOVE_FRAGMENT, SET_FILTERS, SET_FRAGMENT_SETTINGS,
} from 'state/fragments/types';
import { CONTINUE_SAVE_TYPE, FORM_MODE_CLONE, FORM_MODE_EDIT } from 'state/fragments/const';

export const setSelectedFragment = fragment => ({
  type: SET_SELECTED,
  payload: {
    fragment,
  },
});

export const clearSelectedFragment = () => ({
  type: SET_SELECTED,
  payload: {
    fragment: {},
  },
});

export const setFragments = fragments => ({
  type: SET_FRAGMENTS,
  payload: {
    fragments,
  },
});

export const setPlugins = plugins => ({
  type: SET_PLUGINS,
  payload: {
    plugins,
  },
});

export const setFilters = filters => ({
  type: SET_FILTERS,
  payload: {
    filters,
  },
});

export const removeFragment = fragmentCode => ({
  type: REMOVE_FRAGMENT,
  payload: {
    fragmentCode,
  },
});

export const setFragmentSettings = settings => ({
  type: SET_FRAGMENT_SETTINGS,
  payload: settings,
});

// thunks
export const fetchFragment = (fragmentCode, mode = FORM_MODE_EDIT) => dispatch =>
  new Promise((resolve) => {
    getFragment(fragmentCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedFragment({
            ...json.payload,
            ...(mode === FORM_MODE_CLONE ? {
              code: '',
            } : {}),
          }));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });


export const fetchFragmentDetail = fragmentCode => dispatch => (
  new Promise((resolve) => {
    getFragment(fragmentCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedFragment(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchFragments = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('fragments'));
    getFragments(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setFragments(data.payload));
          dispatch(toggleLoading('fragments'));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(toggleLoading('fragments'));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchPlugins = () => dispatch => (
  new Promise((resolve) => {
    const page = { page: 1, pageSize: 0 };
    getFragments(page).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          const { payload } = json;
          const plugins = [
            ...new Set(payload
              .filter(f => f.pluginCode)
              .map(m => m.pluginCode)),
          ].reduce((acc, item) => {
            acc.push({ code: item, title: item });
            return acc;
          }, []);
          dispatch(setPlugins(plugins));
          resolve();
        });
      } else {
        resolve();
      }
    }).catch(() => {});
  })
);

export const fetchFragmentSettings = () => dispatch =>
  new Promise((resolve) => {
    getFragmentSettings().then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setFragmentSettings(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const updateFragmentSettings = settings => dispatch =>
  new Promise((resolve) => {
    putFragmentSettings(settings).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setFragmentSettings(json.payload));
          dispatch(addToast(
            { id: 'fragment.settings.alert.success' },
            TOAST_SUCCESS,
          ));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(
            { id: 'fragment.settings.alert.error' },
            TOAST_ERROR,
          ));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendDeleteFragment = fragmentCode => dispatch =>
  new Promise((resolve) => {
    deleteFragment(fragmentCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeFragment(fragmentCode));
          dispatch(fetchFragments());
          dispatch(addToast(
            { id: 'app.deleted', values: { type: 'fragment', code: fragmentCode } },
            TOAST_SUCCESS,
          ));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });

export const sendPostFragment = (fragment, saveType) => async (dispatch) => {
  const response = await postFragment(fragment);
  const json = await response.json();
  if (response.ok) {
    dispatch(addToast(
      { id: 'fragment.created' },
      TOAST_SUCCESS,
    ));
    if (saveType !== CONTINUE_SAVE_TYPE) history.push(ROUTE_FRAGMENT_LIST);
    else {
      history.push(routeConverter(
        ROUTE_FRAGMENT_EDIT,
        { fragmentCode: fragment.code },
      ));
    }
  } else {
    dispatch(addErrors(json.errors.map(e => e.message)));
    json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
  }
  return json;
};

export const sendPutFragment = (fragment, saveType) => async (dispatch) => {
  const response = await putFragment(fragment);
  const json = await response.json();
  if (response.ok) {
    dispatch(addToast(
      { id: 'fragment.updated' },
      TOAST_SUCCESS,
    ));
    if (saveType !== CONTINUE_SAVE_TYPE) history.push(ROUTE_FRAGMENT_LIST);
  } else {
    dispatch(addErrors(json.errors.map(e => e.message)));
    json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
  }
  return json;
};
