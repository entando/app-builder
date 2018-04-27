import { connect } from 'react-redux';

import { getApis, getPlugins } from 'state/integrations/selectors';
import Integrations from 'ui/dashboard/Integrations';

export const mapDispatchToProps = () => ({
  onWillMount: () => {},
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
