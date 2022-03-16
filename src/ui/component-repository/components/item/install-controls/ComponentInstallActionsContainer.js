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
  const pollStepFunction = progress => dispatch(setInstallUninstallProgress(progress));

  return ({
    onInstall: (component, version) => {
      dispatch(installECRComponent(component, version, pollStepFunction));
    },
    onClickInstallDropdown: (componentCode) => {
      dispatch(fetchECRComponentDetail(componentCode));
    },
    onUninstall: (componentCode) => {
      dispatch(setVisibleModal(''));
      setTimeout(() => {
        const element = document.querySelector(`#component-modal-id-${componentCode}`);
        console.log('finding element with code: ', componentCode, ', here is element: ', element);
        if (element) {
          simulateMouseClick(element);
          console.log('clicked on element');
        } else {
          console.log('did nothing');
        }
      }, 500);
      return dispatch(uninstallECRComponent(componentCode, pollStepFunction));
    },
    onClickUninstall: (componentCode) => {
      dispatch(fetchComponentUsage(componentCode));
      dispatch(setVisibleModal(componentCode));
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
      dispatchProps.onUninstall(ownProps.component.code);
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
