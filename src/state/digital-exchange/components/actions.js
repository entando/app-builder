import {
  SET_DE_COMPONENTS,
  SET_SELECTED_DE_COMPONENT,
  SET_DE_COMPONENT_LIST_VIEW_MODE,
  SET_DE_FILTER,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  START_COMPONENT_UNINSTALLATION,
  FINISH_COMPONENT_UNINSTALLATION,
} from 'state/digital-exchange/components/types';
import { addErrors } from '@entando/messages';
import pollApi from 'helpers/pollApi';
import {
  getDEComponent,
  getDEComponents,
  postDEComponentInstall,
  getDEComponentInstall,
  postDEComponentUninstall,
  getDEComponentUninstall,
} from 'api/digital-exchange/components';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
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

export const startComponentUninstall = id => ({
  type: START_COMPONENT_UNINSTALLATION,
  payload: {
    id,
  },
});

export const finishComponentUninstall = id => ({
  type: FINISH_COMPONENT_UNINSTALLATION,
  payload: {
    id,
  },
});

// thunks

export const installDEComponent = component => dispatch => (
  new Promise((resolve) => {
    postDEComponentInstall(component).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(startComponentInstallation(component.id));
          pollApi(
            () => getDEComponentInstall(component.id),
            ({ payload }) => payload.status === DE_COMPONENT_INSTALLATION_STATUS_COMPLETED,
          )
            .then(() => {
              dispatch(finishComponentInstallation(component.id));
            })
            .catch(({ errors }) => {
              dispatch(addErrors(errors.map(err => err.message)));
            })
            .finally(() => resolve());
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const uninstallDEComponent = componentId => dispatch => (
  new Promise((resolve) => {
    postDEComponentUninstall(componentId).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(startComponentUninstall(componentId));
          pollApi(
            () => getDEComponentUninstall(componentId),
            ({ payload }) => payload.status === DE_COMPONENT_INSTALLATION_STATUS_COMPLETED,
          )
            .then(() => {
              dispatch(finishComponentUninstall(componentId));
            })
            .catch(({ errors }) => {
              dispatch(addErrors(errors.map(err => err.message)));
            })
            .finally(() => resolve());
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
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
