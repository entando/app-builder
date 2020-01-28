import { connect } from 'react-redux';
import { getPluginList } from 'state/plugins/selectors';
import PluginsPage from 'ui/plugins/PluginsPage';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => ({
  plugins: getPluginList(state),
  loading: getLoading(state).plugins,
});

export default connect(mapStateToProps, null)(PluginsPage);
