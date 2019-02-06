import {
  SET_DE_COMPONENTS,
  SET_SELECTED_DE_COMPONENT,
  SET_DE_COMPONENT_LIST_VIEW_MODE,
  SET_DE_FILTER,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  FAIL_COMPONENT_INSTALLATION,
} from 'state/digital-exchange/components/types';
import { addErrors } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';
import { getDEComponent, getDEComponents, postDEComponentInstall, getDEComponentInstall } from 'api/digital-exchange/components';
import { setPage } from 'state/pagination/actions';
import { DE_COMPONENT_INSTALLATION_STATUS_COMPLETED } from 'state/digital-exchange/components/const';

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

export const setDEFilter = (digitalExchangeFilter, digitalExchangeCategory) => ({
  type: SET_DE_FILTER,
  payload: {
    digitalExchangeFilter,
    digitalExchangeCategory,
  },
});

export const setDEComponentListViewMode = componentListViewMode => ({
  type: SET_DE_COMPONENT_LIST_VIEW_MODE,
  payload: {
    componentListViewMode,
  },
});

export const startComponentInstallation = id => ({
  type: START_COMPONENT_INSTALLATION,
  payload: {
    id,
  },
});

export const finishComponentInstallation = id => ({
  type: FINISH_COMPONENT_INSTALLATION,
  payload: {
    id,
  },
});

export const failComponentInstallation = id => ({
  type: FAIL_COMPONENT_INSTALLATION,
  payload: {
    id,
  },
});

// thunks

const pollApi = (apiFn, successConditionFn, timeout = 2000, interval = 100) => {
  const endTime = Number(new Date()) + timeout;
  const checkCondition = (resolve, reject) => {
    apiFn().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (successConditionFn(data)) {
            resolve(data);
          } else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject);
          } else {
            reject({ errors: [{ message: 'Polling timed out' }] });
          }
        });
      } else {
        reject(response);
      }
    });
  };
  return new Promise(checkCondition);
};

export const installComponent = component => dispatch => (
  new Promise((resolve) => {
    postDEComponentInstall(component).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(startComponentInstallation(component.id));
          pollApi(
            () => getDEComponentInstall(component.id),
            ({ payload }) => payload.status === DE_COMPONENT_INSTALLATION_STATUS_COMPLETED,
            2000,
            150,
          )
            .then(() => dispatch(finishComponentInstallation(component.id)))
            .catch(({ errors }) => dispatch(addErrors(errors.map(err => err.message))));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDEComponents = (paginationMetadata = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    const feature = 'digital-exchange/components';
    dispatch(toggleLoading(feature));
    getDEComponents(paginationMetadata, params).then((response) => {
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
