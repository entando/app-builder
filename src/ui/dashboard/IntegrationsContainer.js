import { connect } from 'react-redux';

import { getApis, getPlugins } from 'state/dashboard/selectors';
import { fetchIntegration } from 'state/dashboard/actions';

import Integrations from 'ui/dashboard/Integrations';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchIntegration()),
});

export const mapStateToProps = state => (
  {
    apis: getApis(state),
    plugins: getPlugins(state),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Integrations);
