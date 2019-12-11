import {
  addErrors,
  addToast,
  clearErrors,
  TOAST_ERROR,
  TOAST_WARNING,
} from '@entando/messages';
import { formattedText } from '@entando/utils';
import {
  SET_DE_COMPONENTS,
  SET_SELECTED_DE_COMPONENT,
  SET_DE_COMPONENT_LIST_VIEW_MODE,
  SET_DE_FILTER,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  COMPONENT_INSTALLATION_FAILED,
  COMPONENT_INSTALL_ONGOING_PROGRESS,
  START_COMPONENT_UNINSTALLATION,
  FINISH_COMPONENT_UNINSTALLATION,
  COMPONENT_UNINSTALLATION_FAILED,
  COMPONENT_UNINSTALL_ONGOING_PROGRESS,
} from 'state/digital-exchange/components/types';
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
import {
  DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  DE_COMPONENT_INSTALLATION_STATUS_COMPLETED,
  DE_COMPONENT_INSTALLATION_STATUS_ERROR,
  DE_COMPONENT_UNINSTALLATION_STATUS_COMPLETED,
  DE_COMPONENT_UNINSTALLATION_STATUS_ERROR,
} from 'state/digital-exchange/components/const';

const POLLING_TIMEOUT_IN_MS = 1000 * 60 * 3; // 3 minutes

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

export const componentInstallationFailed = id => ({
  type: COMPONENT_INSTALLATION_FAILED,
  payload: {
    id,
  },
});

export const componentInstallOngoingProgress = id => ({
  type: COMPONENT_INSTALL_ONGOING_PROGRESS,
  payload: {
    id,
  },
});

export const componentUninstallOngoingProgress = id => ({
  type: COMPONENT_UNINSTALL_ONGOING_PROGRESS,
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

export const componentUninstallFailed = id => ({
  type: COMPONENT_UNINSTALLATION_FAILED,
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

export const pollDEComponentInstallStatus = component => dispatch => (
  new Promise((resolve) => {
    dispatch(startComponentInstallation(component.id));
    pollApi({
      apiFn: () => getDEComponentInstall(component.id),
      stopPollingConditionFn: ({
        payload,
      }) => payload && [
        DE_COMPONENT_INSTALLATION_STATUS_COMPLETED,
        DE_COMPONENT_INSTALLATION_STATUS_ERROR,
      ].includes(payload.status),
      timeout: POLLING_TIMEOUT_IN_MS,
    })
      .then((res) => {
        if (res.payload.status === DE_COMPONENT_INSTALLATION_STATUS_COMPLETED) {
          dispatch(finishComponentInstallation(component.id));
        } else {
          dispatch(componentInstallationFailed(component.id));
        }
      })
      .catch((res) => {
        const {
          errors,
          payload,
        } = res;
        if (payload && payload.status === DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS) {
          dispatch(addToast(
            formattedText('digitalExchange.components.notifyInProgress'),
            TOAST_WARNING,
          ));
          dispatch(componentInstallOngoingProgress(component.id));
        } else {
          dispatch(addToast(
            formattedText('digitalExchange.components.notifyFailedInstall'),
            TOAST_WARNING,
          ));
          dispatch(componentInstallationFailed(component.id));
        }
        if (errors && errors.length) {
          dispatch(addErrors(errors.map(err => err.message)));
        }
        resolve(res);
      })
      .finally(() => resolve());
  })
);

export const installDEComponent = component => dispatch => (
  new Promise((resolve) => {
    postDEComponentInstall(component).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(pollDEComponentInstallStatus(component))
            .then(res => resolve(res));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const pollDEComponentUninstallStatus = componentId => dispatch => (
  new Promise((resolve) => {
    dispatch(startComponentUninstall(componentId));
    pollApi({
      apiFn: () => getDEComponentUninstall(componentId),
      stopPollingConditionFn: ({
        payload,
      }) => payload && [
        DE_COMPONENT_UNINSTALLATION_STATUS_COMPLETED,
        DE_COMPONENT_UNINSTALLATION_STATUS_ERROR,
      ].includes(payload.status),
      timeout: POLLING_TIMEOUT_IN_MS,
    })
      .then(({
        payload,
      }) => {
        if (payload.status === DE_COMPONENT_UNINSTALLATION_STATUS_COMPLETED) {
          dispatch(finishComponentUninstall(componentId));
        } else {
          dispatch(componentUninstallFailed(componentId));
        }
      })
      .catch((res) => {
        const {
          errors,
          payload,
        } = res;
        if (payload && payload.status === DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS) {
          dispatch(addToast(
            formattedText('digitalExchange.components.notifyInProgress'),
            TOAST_WARNING,
          ));
          dispatch(componentUninstallOngoingProgress(componentId));
        } else {
          dispatch(addToast(
            formattedText('digitalExchange.components.notifyFailedUninstall'),
            TOAST_WARNING,
          ));
          dispatch(componentUninstallFailed(componentId));
        }
        if (errors && errors.length) {
          dispatch(addErrors(errors.map(err => err.message)));
        }
        resolve(res);
      })
      .finally(() => resolve());
  })
);

export const uninstallDEComponent = componentId => dispatch => (
  new Promise((resolve) => {
    postDEComponentUninstall(componentId).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(pollDEComponentUninstallStatus(componentId))
            .then(res => resolve(res));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const fetchDEComponents = (paginationMetadata = {
  page: 1,
  pageSize: 10,
}, params = '') => dispatch => (
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
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
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
