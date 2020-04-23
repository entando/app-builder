import { connect } from 'react-redux';
import ComponentInstallActions from 'ui/component-repository/components/common/ComponentInstallActions';
import {
  installECRComponent,
  uninstallECRComponent,
  pollECRComponentInstallStatus,
  pollECRComponentUninstallStatus,
  fetchComponentUsage,
} from 'state/component-repository/components/actions';
import {
  getECRComponentLastInstallStatus,
  getECRComponentInstallationStatus,
  getECRComponentUninstallStatus,
  getComponentUsageList,
} from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';

export const mapStateToProps = (state, props) => ({
  lastInstallStatus: getECRComponentLastInstallStatus(state, props),
  installationStatus: getECRComponentInstallationStatus(state, props),
  uninstallStatus: getECRComponentUninstallStatus(state, props),
  installUninstallLoading: !!getLoading(state)[`deComponentInstallUninstall-${props.component.id}`],
  componentUsageList: getComponentUsageList(state),
});

export const mapDispatchToProps = dispatch => ({
  onInstall: component => dispatch(installECRComponent(component)),
  onUninstall: (componentId) => {
    dispatch(setVisibleModal(''));
    return dispatch(uninstallECRComponent(componentId));
  },
  onClickUninstall: (componentId) => {
    dispatch(fetchComponentUsage(componentId));
    dispatch(setVisibleModal(componentId));
  },
  recheckInstallStatus: component => dispatch(pollECRComponentInstallStatus(component)),
  recheckUninstallStatus: componentId => dispatch(pollECRComponentUninstallStatus(componentId)),
});

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onRetryAction: () => {
    if (ownProps.component && ownProps.component.installed) {
      dispatchProps.onUninstall(ownProps.component.id);
    } else {
      dispatchProps.onInstall(ownProps.component);
    }
  },
  onRecheckStatus: () => {
    if (ownProps.component && ownProps.component.installed) {
      dispatchProps.recheckUninstallStatus(ownProps.component.id);
    } else {
      dispatchProps.recheckInstallStatus(ownProps.component);
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ComponentInstallActions);
