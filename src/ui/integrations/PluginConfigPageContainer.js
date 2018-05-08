
import { connect } from 'react-redux';
import { getParams } from '@entando/router';

import PluginConfigPage from 'ui/integrations/PluginConfigPage';

// map the props
export const mapStateToProps = state => ({
  pluginId: getParams(state).pluginId || '',
});

// connect the component
const PluginConfigPageContainer = connect(mapStateToProps, null)(PluginConfigPage);

// export connected component (Container)
export default PluginConfigPageContainer;
