import { connect } from 'react-redux';
import ComponentInstallActions from 'ui/digital-exchange/components/common/ComponentInstallActions';
import { installComponent } from 'state/digital-exchange/components/actions';
import { getDEComponentInstallation } from 'state/digital-exchange/components/selectors';

export const mapStateToProps = (state, props) => ({
  installationProgress: getDEComponentInstallation(state, props),
});

export const mapDispatchToProps = dispatch => ({
  onInstall: (component) => {
    dispatch(installComponent(component));
  },
  onUninstall: (componentId) => {
    console.log(componentId);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentInstallActions);
