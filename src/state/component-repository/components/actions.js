import {
  addErrors,
  addToast,
  clearErrors,
  TOAST_ERROR,
  TOAST_WARNING,
} from '@entando/messages';
import {
  SET_ECR_COMPONENTS,
  SET_SELECTED_ECR_COMPONENT,
  SET_ECR_COMPONENT_LIST_VIEW_MODE,
  SET_ECR_FILTER,
  CLEAR_ECR_SEARCH_FILTER,
  START_COMPONENT_INSTALLATION,
  FINISH_COMPONENT_INSTALLATION,
  COMPONENT_INSTALLATION_FAILED,
  COMPONENT_INSTALL_ONGOING_PROGRESS,
  START_COMPONENT_UNINSTALLATION,
  FINISH_COMPONENT_UNINSTALLATION,
  COMPONENT_UNINSTALLATION_FAILED,
  COMPONENT_UNINSTALL_ONGOING_PROGRESS,
  SET_COMPONENT_USAGE_LIST,
  SET_ECR_SEARCH_FILTER_TYPE,
} from 'state/component-repository/components/types';
import pollApi from 'helpers/pollApi';
import {
  getECRComponent,
  getECRComponents,
  postECRComponentInstall,
  getECRComponentInstall,
  postECRComponentUninstall,
  getECRComponentUninstall,
  getComponentUsage,
} from 'api/component-repository/components';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import {
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_INSTALLATION_STATUS_COMPLETED,
  ECR_COMPONENT_INSTALLATION_STATUS_ERROR,
  ECR_COMPONENT_UNINSTALLATION_STATUS_COMPLETED,
  ECR_COMPONENT_UNINSTALLATION_STATUS_ERROR,
  ECR_COMPONENT_INSTALLATION_STATUS_ROLLBACK,
} from 'state/component-repository/components/const';

const POLLING_TIMEOUT_IN_MS = 1000 * 60 * 3; // 3 minutes

export const setSelectedECRComponent = componentRepositoryComponent => ({
  type: SET_SELECTED_ECR_COMPONENT,
  payload: {
    componentRepositoryComponent,
  },
});

export const setECRComponents = componentRepositoryComponents => ({
  type: SET_ECR_COMPONENTS,
  payload: {
    componentRepositoryComponents,
  },
});

export const setECRFilter = (componentRepositoryFilter, componentRepositoryCategory) => ({
  type: SET_ECR_FILTER,
  payload: {
    componentRepositoryFilter,
    componentRepositoryCategory,
  },
});

export const setECRFilterType = filterType => ({
  type: SET_ECR_SEARCH_FILTER_TYPE,
  payload: filterType,
});

export const clearECRSearchFilter = componentRepositoryCategory => ({
  type: CLEAR_ECR_SEARCH_FILTER,
  payload: {
    componentRepositoryCategory,
  },
});

export const setECRComponentListViewMode = componentListViewMode => ({
  type: SET_ECR_COMPONENT_LIST_VIEW_MODE,
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

export const setComponentUsageList = usageList => ({
  type: SET_COMPONENT_USAGE_LIST,
  payload: {
    usageList,
  },
});

// thunks

export const pollECRComponentInstallStatus = component => dispatch => (
  new Promise((resolve) => {
    dispatch(startComponentInstallation(component.id));
    pollApi({
      apiFn: () => getECRComponentInstall(component.id),
      stopPollingConditionFn: ({
        payload,
      }) => payload && [
        ECR_COMPONENT_INSTALLATION_STATUS_COMPLETED,
        ECR_COMPONENT_INSTALLATION_STATUS_ERROR,
        ECR_COMPONENT_INSTALLATION_STATUS_ROLLBACK,
      ].includes(payload.status),
      timeout: POLLING_TIMEOUT_IN_MS,
    })
      .then((res) => {
        if (res.payload.status === ECR_COMPONENT_INSTALLATION_STATUS_COMPLETED) {
          dispatch(finishComponentInstallation(component.id));
        } else {
          dispatch(componentInstallationFailed(component.id));
          if (res.payload.status === ECR_COMPONENT_INSTALLATION_STATUS_ROLLBACK) {
            dispatch(addToast(
              { id: 'componentRepository.components.installRollback' },
              TOAST_WARNING,
            ));
          }
        }
      })
      .catch((res) => {
        const {
          errors,
          payload,
        } = res;
        if (payload && payload.status === ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS) {
          dispatch(addToast(
            { id: 'componentRepository.components.notifyInProgress' },
            TOAST_WARNING,
          ));
          dispatch(componentInstallOngoingProgress(component.id));
        } else {
          if (payload && payload.status === ECR_COMPONENT_INSTALLATION_STATUS_ROLLBACK) {
            dispatch(addToast(
              { id: 'componentRepository.components.installRollback' },
              TOAST_WARNING,
            ));
          } else {
            dispatch(addToast(
              { id: 'componentRepository.components.notifyFailedInstall' },
              TOAST_WARNING,
            ));
          }
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

export const installECRComponent = component => dispatch => (
  new Promise((resolve) => {
    const loadingId = `deComponentInstallUninstall-${component.id}`;
    dispatch(toggleLoading(loadingId));
    postECRComponentInstall(component).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(pollECRComponentInstallStatus(component))
            .then(res => resolve(res));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
        dispatch(toggleLoading(loadingId));
      });
    }).catch(() => {});
  })
);

export const pollECRComponentUninstallStatus = componentId => dispatch => (
  new Promise((resolve) => {
    dispatch(startComponentUninstall(componentId));
    pollApi({
      apiFn: () => getECRComponentUninstall(componentId),
      stopPollingConditionFn: ({
        payload,
      }) => payload && [
        ECR_COMPONENT_UNINSTALLATION_STATUS_COMPLETED,
        ECR_COMPONENT_UNINSTALLATION_STATUS_ERROR,
      ].includes(payload.status),
      timeout: POLLING_TIMEOUT_IN_MS,
    })
      .then(({
        payload,
      }) => {
        if (payload.status === ECR_COMPONENT_UNINSTALLATION_STATUS_COMPLETED) {
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
        if (payload && payload.status === ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS) {
          dispatch(addToast(
            { id: 'componentRepository.components.notifyInProgress' },
            TOAST_WARNING,
          ));
          dispatch(componentUninstallOngoingProgress(componentId));
        } else {
          dispatch(addToast(
            { id: 'componentRepository.components.notifyFailedUninstall' },
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

export const uninstallECRComponent = componentId => dispatch => (
  new Promise((resolve) => {
    const loadingId = `deComponentInstallUninstall-${componentId}`;
    dispatch(toggleLoading(loadingId));
    postECRComponentUninstall(componentId).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(pollECRComponentUninstallStatus(componentId))
            .then(res => resolve(res));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
        dispatch(toggleLoading(loadingId));
      });
    }).catch(() => {});
  })
);

export const fetchECRComponents = (paginationMetadata = {
  page: 1,
  pageSize: 10,
}, params = '') => dispatch => (
  new Promise((resolve) => {
    const feature = 'component-repository/components';
    dispatch(toggleLoading(feature));
    getECRComponents(paginationMetadata, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setECRComponents(data.payload));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading(feature));
        resolve();
      });
    }).catch(() => {
      dispatch(toggleLoading(feature));
    });
  })
);

export const fetchECRComponentDetail = id => dispatch => (
  new Promise((resolve) => {
    getECRComponent(id).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedECRComponent(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchComponentUsage = id => dispatch => (
  new Promise((resolve) => {
    const loadingId = 'component-repository/component-usage';
    dispatch(toggleLoading(loadingId));
    getComponentUsage(id).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setComponentUsageList(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading(loadingId));
        resolve();
      });
    }).catch(() => {
      dispatch(toggleLoading(loadingId));
    });
  })
);
