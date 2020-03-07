import { connect } from 'react-redux';
import { getPluginList } from 'state/plugins/selectors';
import PluginListPage from 'ui/plugins/PluginListPage';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => ({
  plugins: getPluginList(state),
  loading: getLoading(state).plugins,
});

export default connect(mapStateToProps, null)(PluginListPage);
