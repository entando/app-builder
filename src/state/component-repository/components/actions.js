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
  SET_INSTALL_UNINSTALL_PROGRESS,
  TOGGLE_CONFLICTS_MODAL,
  UPDATE_INSTALL_PLAN,
  UPDATE_ALL_INSTALL_PLAN,
} from 'state/component-repository/components/types';
import pollApi from 'helpers/pollApi';
import {
  getECRComponent,
  getECRComponents,
  postECRComponentUninstall,
  getECRComponentUninstall,
  getComponentUsage,
  getECRComponentInstallPlan,
  putECRComponentInstallPlan,
  postECRComponentInstallPlan,
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
import { setVisibleModal } from 'state/modal/actions';
import { MODAL_ID } from 'ui/component-repository/components/InstallationPlanModal';
import { fetchBundleStatuses, fetchSelectedBundleStatusWithCode } from 'state/component-repository/hub/actions';
import { updateAllActions } from 'state/component-repository/components/reducer';

const POLLING_TIMEOUT_IN_MS = 1000 * 60 * 5; // 5 minutes

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

export const setInstallUninstallProgress = progress => ({
  type: SET_INSTALL_UNINSTALL_PROGRESS,
  payload: {
    progress,
  },
});

export const toggleConflictsModal = (open, installPlan, component, version, readOnly) => ({
  type: TOGGLE_CONFLICTS_MODAL,
  payload: {
    open,
    installPlan,
    component,
    version,
    readOnly,
  },
});

export const updateInstallPlan = (category, name, action) => ({
  type: UPDATE_INSTALL_PLAN,
  payload: {
    category, name, action,
  },
});

export const updateAllInstallPlan = action => ({
  type: UPDATE_ALL_INSTALL_PLAN,
  payload: {
    action,
  },
});

// thunks

export const pollECRComponentInstallStatus = (componentCode, stepFunction) => dispatch => (
  new Promise((resolve) => {
    dispatch(startComponentInstallation(componentCode));
    pollApi({
      apiFn: () => getECRComponentInstallPlan(componentCode),
      stopPollingConditionFn: ({
        payload,
      }) => payload && [
        ECR_COMPONENT_INSTALLATION_STATUS_COMPLETED,
        ECR_COMPONENT_INSTALLATION_STATUS_ERROR,
        ECR_COMPONENT_INSTALLATION_STATUS_ROLLBACK,
      ].includes(payload.status),
      timeout: POLLING_TIMEOUT_IN_MS,
      stepFunction: payload => stepFunction(payload.progress),
    })
      .then((res) => {
        if (res.payload.status === ECR_COMPONENT_INSTALLATION_STATUS_COMPLETED) {
          dispatch(finishComponentInstallation(componentCode, res.payload));
          dispatch(fetchSelectedBundleStatusWithCode(componentCode));
        } else {
          dispatch(componentInstallationFailed(componentCode));
          if (res.payload.installErrorMessage) {
            dispatch(addToast(
              res.payload.installErrorMessage,
              TOAST_WARNING,
            ));
          }

          if (res.payload.rollbackErrorMessage) {
            dispatch(addToast(
              res.payload.rollbackErrorMessage,
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

const procceedWithInstall = (component, body, resolve, dispatch, logProgress, loadingId) =>
  putECRComponentInstallPlan(component, body)
    .then((res) => {
      res.json().then((data) => {
        if (res.ok) {
          dispatch(pollECRComponentInstallStatus(component.code, logProgress))
            .then(payload => resolve(payload));
          dispatch(toggleLoading(loadingId));
        } else {
          if (data && data.errors) {
            dispatch(addErrors(data.errors.map(err => err.message)));
            data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          }
          // when version is not available, error payload is different
          const versionUnavailable = data && data.message;
          if (versionUnavailable) {
            dispatch(addErrors([data.message]));
            dispatch(addToast(data.message, TOAST_ERROR));
          }
          dispatch(toggleLoading(loadingId));
          resolve();
        }
      });
      if (logProgress) {
        logProgress(0);
      }
    });

export const installECRComponent = (component, version, logProgress, resolvedInstallPlan) =>
  dispatch => (
    new Promise((resolve) => {
      const loadingId = `deComponentInstallUninstall-${component.code}`;
      dispatch(toggleLoading(loadingId));

      // is the install conflicts already resolved?
      if (resolvedInstallPlan) {
        procceedWithInstall(
          component, { ...resolvedInstallPlan, version },
          resolve, dispatch, logProgress, loadingId,
        );
      } else {
        // check for conflicts on install plan before install
        postECRComponentInstallPlan(component, version)
          .then((response) => {
            response.json().then(({ payload: installPlan }) => {
              if (!installPlan.hasConflicts) {
                // no conflicts
                const defaultInstallPlan = updateAllActions(installPlan, 'CREATE');
                procceedWithInstall(
                  component, { ...defaultInstallPlan, version }, resolve,
                  dispatch, logProgress, loadingId,
                );
              } else {
                // show conflict modal
                dispatch(toggleLoading(loadingId));
                dispatch(setVisibleModal(MODAL_ID));
                dispatch(toggleConflictsModal(true, installPlan, component, version));
              }
            });
          }).catch((error) => {
            if (error && error.message) {
              dispatch(addErrors([error.message]));
              dispatch(addToast(error.message, TOAST_ERROR));
            }
            dispatch(toggleLoading(loadingId));
          });
      }
    })
  );

export const getInstallPlan = component => dispatch => (
  new Promise((resolve) => {
    const loadingId = 'component-repository/component-usage';
    dispatch(toggleLoading(loadingId));
    getECRComponentInstallPlan(component.code).then((response) => {
      response.json().then(({ payload, errors }) => {
        try {
          if (errors && errors.length) {
            dispatch(addErrors(errors.map(err => err.message)));
            errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          } else {
            const installPlan = typeof payload.installPlan === 'string' ? JSON.parse(payload.installPlan) : payload.installPlan;
            // show conflict modal
            dispatch(setVisibleModal(MODAL_ID));
            dispatch(toggleConflictsModal(true, installPlan, component, null, true));
          }
        } catch (e) {
          dispatch(addToast(e.message, TOAST_ERROR));
        } finally {
          dispatch(toggleLoading(loadingId));
          resolve();
        }
      });
    }).catch(() => {
      dispatch(addToast(
        { id: 'componentRepository.components.installPlanFailed' },
        TOAST_ERROR,
      ));
      dispatch(toggleLoading(loadingId));
    });
  })
);

export const pollECRComponentUninstallStatus = (componentCode, stepFunction) => dispatch => (
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
      stepFunction: payload => stepFunction(payload.progress),
    })
      .then(({
        payload,
      }) => {
        if (payload.status === ECR_COMPONENT_UNINSTALLATION_STATUS_COMPLETED) {
          dispatch(finishComponentUninstall(componentCode));
          dispatch(fetchSelectedBundleStatusWithCode(componentCode));
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

export const uninstallECRComponent = (componentCode, logProgress) => dispatch => (
  new Promise((resolve) => {
    const loadingId = `deComponentInstallUninstall-${componentCode}`;
    dispatch(toggleLoading(loadingId));
    postECRComponentUninstall(componentCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(pollECRComponentUninstallStatus(componentCode, logProgress))
            .then(res => resolve(res));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
        dispatch(toggleLoading(loadingId));
      });
      logProgress(0);
    }).catch(() => {
      dispatch(toggleLoading(loadingId));
    });
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
          dispatch(fetchBundleStatuses(data.payload.map(component => component.repoUrl)));
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
          dispatch(setSelectedECRComponent({}));
          if (json.errors) {
            dispatch(addErrors(json.errors.map(err => err.message)));
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          }
        }
        resolve();
      });
    }).catch(() => dispatch(setSelectedECRComponent({})));
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
