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
import { toggleLoading, setLoading } from 'state/loading/actions';
import {
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_INSTALLATION_STATUS_COMPLETED,
  ECR_COMPONENT_INSTALLATION_STATUS_ERROR,
  ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
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

export const startComponentInstallation = code => ({
  type: START_COMPONENT_INSTALLATION,
  payload: {
    code,
  },
});

export const finishComponentInstallation = (code, installedJob) => ({
  type: FINISH_COMPONENT_INSTALLATION,
  payload: {
    code,
    installedJob,
  },
});

export const componentInstallationFailed = code => ({
  type: COMPONENT_INSTALLATION_FAILED,
  payload: {
    code,
  },
});

export const componentInstallOngoingProgress = code => ({
  type: COMPONENT_INSTALL_ONGOING_PROGRESS,
  payload: {
    code,
  },
});

export const componentUninstallOngoingProgress = code => ({
  type: COMPONENT_UNINSTALL_ONGOING_PROGRESS,
  payload: {
    code,
  },
});

export const startComponentUninstall = code => ({
  type: START_COMPONENT_UNINSTALLATION,
  payload: {
    code,
  },
});

export const componentUninstallFailed = code => ({
  type: COMPONENT_UNINSTALLATION_FAILED,
  payload: {
    code,
  },
});

export const finishComponentUninstall = code => ({
  type: FINISH_COMPONENT_UNINSTALLATION,
  payload: {
    code,
  },
});

export const setComponentUsageList = usageList => ({
  type: SET_COMPONENT_USAGE_LIST,
  payload: {
    usageList,
  },
});

// thunks

export const pollECRComponentInstallStatus = componentCode => dispatch => (
  new Promise((resolve) => {
    dispatch(startComponentInstallation(componentCode));
    pollApi({
      apiFn: () => getECRComponentInstall(componentCode),
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
          dispatch(finishComponentInstallation(componentCode, res.payload));
        } else {
          dispatch(componentInstallationFailed(componentCode));
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
          dispatch(componentInstallOngoingProgress(componentCode));
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
          dispatch(componentInstallationFailed(componentCode));
        }
        if (errors && errors.length) {
          dispatch(addErrors(errors.map(err => err.message)));
          errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve(res);
      })
      .finally(() => resolve());
  })
);

export const installECRComponent = (component, version) => dispatch => (
  new Promise((resolve) => {
    const loadingId = `deComponentInstallUninstall-${component.code}`;
    dispatch(toggleLoading(loadingId));
    postECRComponentInstall(component, version).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(pollECRComponentInstallStatus(component.code))
            .then(res => resolve(res));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
        dispatch(toggleLoading(loadingId));
      });
    }).catch(() => {});
  })
);

export const pollECRComponentUninstallStatus = componentCode => dispatch => (
  new Promise((resolve) => {
    dispatch(startComponentUninstall(componentCode));
    pollApi({
      apiFn: () => getECRComponentUninstall(componentCode),
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
          dispatch(finishComponentUninstall(componentCode));
        } else {
          dispatch(componentUninstallFailed(componentCode));
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
          dispatch(componentUninstallOngoingProgress(componentCode));
        } else {
          dispatch(addToast(
            { id: 'componentRepository.components.notifyFailedUninstall' },
            TOAST_WARNING,
          ));
          dispatch(componentUninstallFailed(componentCode));
        }
        if (errors && errors.length) {
          dispatch(addErrors(errors.map(err => err.message)));
          errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve(res);
      })
      .finally(() => resolve());
  })
);

export const uninstallECRComponent = componentCode => dispatch => (
  new Promise((resolve) => {
    const loadingId = `deComponentInstallUninstall-${componentCode}`;
    dispatch(toggleLoading(loadingId));
    postECRComponentUninstall(componentCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(pollECRComponentUninstallStatus(componentCode))
            .then(res => resolve(res));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
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
    dispatch(setLoading(feature, true));
    getECRComponents(paginationMetadata, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setECRComponents(data.payload));
          dispatch(setPage(data.metaData));

          if (data.payload.length) {
            data.payload.forEach(({ lastJob }) => {
              if (lastJob && lastJob.status === ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS) {
                dispatch(pollECRComponentInstallStatus(lastJob.componentId));
              } else if (
                lastJob && lastJob.status === ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS
              ) {
                dispatch(pollECRComponentUninstallStatus(lastJob.componentId));
              }
            });
          }
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(setLoading(feature, false));
        resolve();
      });
    }).catch(() => {
      dispatch(setLoading(feature, false));
    });
  })
);

export const fetchECRComponentDetail = code => dispatch => (
  new Promise((resolve) => {
    getECRComponent(code).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedECRComponent(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchComponentUsage = code => dispatch => (
  new Promise((resolve) => {
    const loadingId = 'component-repository/component-usage';
    dispatch(toggleLoading(loadingId));
    getComponentUsage(code).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setComponentUsageList(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading(loadingId));
        resolve();
      });
    }).catch(() => {
      dispatch(toggleLoading(loadingId));
    });
  })
);
