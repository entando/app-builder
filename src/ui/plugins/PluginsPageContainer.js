import { connect } from 'react-redux';
import { getPluginList } from 'state/plugins/selectors';
import PluginsPage from 'ui/plugins/PluginsPage';

export const mapStateToProps = state => ({
  plugins: getPluginList(state),
});

export default connect(mapStateToProps, null)(PluginsPage);
