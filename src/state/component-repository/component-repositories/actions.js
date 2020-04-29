import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';

import {
  SET_COMPONENT_REPOSITORIES,
  SET_SELECTED_COMPONENT_REPOSITORY,
  REMOVE_COMPONENT_REPOSITORY,
} from 'state/component-repository/component-repositories/types';
import {
  getComponentRepositories,
  getComponentRepository,
  postComponentRepository,
  putComponentRepository,
  deleteComponentRepository,
} from 'api/component-repository/componentRepositories';
import { setPage } from 'state/pagination/actions';
import { history, ROUTE_ECR_CONFIG_LIST } from 'app-init/router';


export const setSelectedComponentRepository = componentRepository => ({
  type: SET_SELECTED_COMPONENT_REPOSITORY,
  payload: {
    componentRepository,
  },
});

export const setComponentRepositories = componentRepositories => ({
  type: SET_COMPONENT_REPOSITORIES,
  payload: {
    componentRepositories,
  },
});

export const removeComponentRepository = componentRepository => ({
  type: REMOVE_COMPONENT_REPOSITORY,
  payload: {
    componentRepository,
  },
});

export const fetchComponentRepositories = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('component-repository/list'));
    getComponentRepositories(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setComponentRepositories(data.payload));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('component-repository/list'));
        resolve();
      });
    }).catch(() => {
      dispatch(toggleLoading('component-repository/list'));
    });
  })
);

export const fetchComponentRepository = (id, initForm = false) => dispatch => (
  new Promise((resolve) => {
    getComponentRepository(id).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setSelectedComponentRepository(data.payload));
          if (initForm) {
            dispatch(initialize('ecrSettings', data.payload));
          }
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendDeleteComponentRepository = marketplace => dispatch => (
  new Promise((resolve) => {
    deleteComponentRepository(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removeComponentRepository(marketplace));
          dispatch(addToast(
            { id: 'app.deleted', values: { type: 'component repository', code: null } },
            TOAST_SUCCESS,
          ));
        } else {
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPostComponentRepository = marketplace => dispatch => (
  new Promise((resolve) => {
    postComponentRepository(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.created', values: { type: 'component repository', code: data.payload.name } },
            TOAST_SUCCESS,
          ));
          history.push(ROUTE_ECR_CONFIG_LIST);
        } else {
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const sendPutComponentRepository = marketplace => dispatch => (
  new Promise((resolve) => {
    putComponentRepository(marketplace).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(addToast(
            { id: 'app.updated', values: { type: 'component repository', code: data.payload.name } },
            TOAST_SUCCESS,
          ));
          history.push(ROUTE_ECR_CONFIG_LIST);
        } else {
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);
