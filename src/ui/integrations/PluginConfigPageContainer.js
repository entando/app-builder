import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PluginConfigPage from 'ui/integrations/PluginConfigPage';

export const mapStateToProps = (state, { match: { params } }) => ({
  pluginId: params.pluginId || '',
});

export default withRouter(connect(mapStateToProps, null)(PluginConfigPage));
