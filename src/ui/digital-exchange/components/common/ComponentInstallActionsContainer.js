import { connect } from 'react-redux';
import ComponentInstallActions from 'ui/digital-exchange/components/common/ComponentInstallActions';
import {
  installDEComponent,
  uninstallDEComponent,
  pollDEComponentInstallStatus,
  pollDEComponentUninstallStatus,
} from 'state/digital-exchange/components/actions';
import {
  getDEComponentLastInstallStatus,
  getDEComponentInstallationStatus,
  getDEComponentUninstallStatus,
} from 'state/digital-exchange/components/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';

export const mapStateToProps = (state, props) => ({
  lastInstallStatus: getDEComponentLastInstallStatus(state, props),
  installationStatus: getDEComponentInstallationStatus(state, props),
  uninstallStatus: getDEComponentUninstallStatus(state, props),
  installUninstallLoading: !!getLoading(state)[`deComponentInstallUninstall-${props.component.id}`],
});

export const mapDispatchToProps = dispatch => ({
  onInstall: component => dispatch(installDEComponent(component)),
  onUninstall: (componentId) => {
    dispatch(setVisibleModal(''));
    return dispatch(uninstallDEComponent(componentId));
  },
  onClickUninstall: componentId => dispatch(setVisibleModal(componentId)),
  recheckInstallStatus: component => dispatch(pollDEComponentInstallStatus(component)),
  recheckUninstallStatus: componentId => dispatch(pollDEComponentUninstallStatus(componentId)),
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
