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
} from 'state/component-repository/components/actions';
import {
  getECRComponentLastInstallStatus,
  getECRComponentInstallationStatus,
  getECRComponentUninstallStatus,
  getComponentUsageList,
  getInstallUninstallProgress,
} from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';

export const mapStateToProps = (state, props) => ({
  lastInstallStatus: getECRComponentLastInstallStatus(state, props),
  installationStatus: getECRComponentInstallationStatus(state, props),
  uninstallStatus: getECRComponentUninstallStatus(state, props),
  installUninstallLoading: !!getLoading(state)[`deComponentInstallUninstall-${props.component.code}`],
  componentUsageList: getComponentUsageList(state),
  progress: getInstallUninstallProgress(state),
});

export const mapDispatchToProps = dispatch => ({
  onInstall: (component, version) => {
    const stepFunction = progress => dispatch(setInstallUninstallProgress(progress));
    dispatch(installECRComponent(component, version, stepFunction));
  },
  onClickInstallDropdown: (componentCode) => {
    dispatch(fetchECRComponentDetail(componentCode));
  },
  onUninstall: (componentCode) => {
    dispatch(setVisibleModal(''));
    const stepFunction = progress => dispatch(setInstallUninstallProgress(progress));
    return dispatch(uninstallECRComponent(componentCode, stepFunction));
  },
  onClickUninstall: (componentCode) => {
    dispatch(fetchComponentUsage(componentCode));
    dispatch(setVisibleModal(componentCode));
  },
  recheckInstallStatus: componentCode => dispatch(pollECRComponentInstallStatus(componentCode)),
  recheckUninstallStatus: componentCode => dispatch(pollECRComponentUninstallStatus(componentCode)),
});

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onRetryAction: () => {
    if (ownProps.component && ownProps.component.installed) {
      dispatchProps.onUninstall(ownProps.component.code);
    } else {
      dispatchProps.onInstall(ownProps.component);
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
