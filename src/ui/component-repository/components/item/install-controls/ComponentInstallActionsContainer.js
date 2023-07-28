import { connect } from 'react-redux';

import ComponentInstallActions from 'ui/component-repository/components/item/install-controls/ComponentInstallActions';
import {
  installECRComponent,
  uninstallECRComponent,
  pollECRComponentInstallStatus,
  pollECRComponentUninstallStatus,
  fetchComponentUsage,
  fetchECRComponentDetail,
  setInstallUninstallProgress,
  setSelectedComponentInstallVersion,
  setInstallHasConflictingVersion,
  startComponentUninstall,
  componentUninstallOngoingProgress,
} from 'state/component-repository/components/actions';
import {
  getECRComponentLastInstallStatus,
  getECRComponentInstallationStatus,
  getECRComponentUninstallStatus,
  getComponentUsageList,
  getInstallUninstallProgress,
  getECRComponentInstallationVersion,
  getECRComponentInstallationHasConflictingVersion,
} from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { simulateMouseClick } from 'ui/app-tour/AppTour';

export const mapStateToProps = (state, props) => ({
  lastInstallStatus: getECRComponentLastInstallStatus(state, props),
  installationStatus: getECRComponentInstallationStatus(state, props),
  uninstallStatus: getECRComponentUninstallStatus(state, props),
  installUninstallLoading: !!getLoading(state)[`deComponentInstallUninstall-${props.component.code}`],
  componentUsageList: getComponentUsageList(state),
  progress: getInstallUninstallProgress(state),
  selectedVersion: getECRComponentInstallationVersion(state) || '',
  isConflictVersion: getECRComponentInstallationHasConflictingVersion(state),
});

export const mapDispatchToProps = (dispatch) => {
  const pollStepFunction = (progress, payload) => {
    dispatch(setInstallUninstallProgress(progress));
    // only needed for uninstall progress
    if (payload && payload.componentId) {
      dispatch(componentUninstallOngoingProgress(payload.componentId, payload));
    }
  };

  return ({
    onInstall: (component, version) => {
      dispatch(componentUninstallOngoingProgress(component.code, {}));
      return dispatch(installECRComponent(component, version, pollStepFunction));
    },
    onClickInstallDropdown: (componentCode) => {
      dispatch(fetchECRComponentDetail(componentCode));
    },
    onUninstall: (componentCode) => {
      dispatch(setVisibleModal(''));
      setTimeout(() => {
        const element = document.querySelector(`#component-modal-id-${componentCode}`);
        if (element) {
          simulateMouseClick(element);
        }
      }, 500);
      return dispatch(uninstallECRComponent(componentCode, pollStepFunction));
    },
    startComponentUninstall: componentCode => dispatch(startComponentUninstall(componentCode)),
    resetUninstallProgressPayload: componentCode =>
      dispatch(componentUninstallOngoingProgress(componentCode, {})),
    onClickUninstall: (component) => {
      dispatch(fetchComponentUsage(component.code));
      dispatch(setVisibleModal(`uninstall-manager-for-${component.code}`));
    },
    recheckInstallStatus:
      componentCode => dispatch(pollECRComponentInstallStatus(componentCode, pollStepFunction)),
    recheckUninstallStatus:
      componentCode => dispatch(pollECRComponentUninstallStatus(componentCode, pollStepFunction)),
    setSelectedVersion: version => dispatch(setSelectedComponentInstallVersion(version)),
    setIsConflictVersion: hasConflict => dispatch(setInstallHasConflictingVersion(hasConflict)),
  });
};

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onRetryAction: (version) => {
    if (ownProps.component && ownProps.component.installed) {
      // dispatchProps.onUninstall(ownProps.component.code);
      dispatchProps.resetUninstallProgressPayload(ownProps.component.code);
      dispatchProps.startComponentUninstall(ownProps.component.code);
      dispatchProps.onClickUninstall(ownProps.component);
    } else {
      dispatchProps.onInstall(ownProps.component, version);
    }
  },
  onRecheckStatus: () => {
    if (ownProps.component && ownProps.component.installed) {
      dispatchProps.recheckUninstallStatus(ownProps.component.code);
    } else {
      dispatchProps.recheckInstallStatus(ownProps.component.code);
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  {
    pure: false,
  },
)(ComponentInstallActions);
