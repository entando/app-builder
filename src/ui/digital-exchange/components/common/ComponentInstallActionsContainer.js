import { connect } from 'react-redux';
import ComponentInstallActions from 'ui/digital-exchange/components/common/ComponentInstallActions';
import { installDEComponent, uninstallDEComponent } from 'state/digital-exchange/components/actions';
import {
  getDEComponentInstallationStatus,
  getDEComponentUninstallStatus,
} from 'state/digital-exchange/components/selectors';

export const mapStateToProps = (state, props) => ({
  installationStatus: getDEComponentInstallationStatus(state, props),
  uninstallStatus: getDEComponentUninstallStatus(state, props),
});

export const mapDispatchToProps = dispatch => ({
  onInstall: (component) => {
    dispatch(installDEComponent(component));
  },
  onUninstall: (componentId) => {
    dispatch(uninstallDEComponent(componentId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentInstallActions);
