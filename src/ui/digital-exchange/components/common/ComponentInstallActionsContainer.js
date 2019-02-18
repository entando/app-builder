import { connect } from 'react-redux';
import ComponentInstallActions from 'ui/digital-exchange/components/common/ComponentInstallActions';
import { installDEComponent } from 'state/digital-exchange/components/actions';
import { getDEComponentInstallationStatus } from 'state/digital-exchange/components/selectors';

export const mapStateToProps = (state, props) => ({
  installationStatus: getDEComponentInstallationStatus(state, props),
});

export const mapDispatchToProps = dispatch => ({
  onInstall: (component) => {
    dispatch(installDEComponent(component));
  },
  onUninstall: (componentId) => {
    // eslint-disable-next-line no-console
    console.log(componentId);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentInstallActions);
