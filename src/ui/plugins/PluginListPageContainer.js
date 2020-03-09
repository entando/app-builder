import { connect } from 'react-redux';
import { getPluginList } from 'state/plugins/selectors';
import PluginListPage from 'ui/plugins/PluginListPage';
import { getLoading } from 'state/loading/selectors';
import { fetchPlugins } from 'state/plugins/thunks';

export const mapStateToProps = state => ({
  plugins: getPluginList(state),
  loading: getLoading(state).plugins,
});


export const mapDispatchToProps = dispatch => ({
  fetchPlugins: () => dispatch(fetchPlugins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PluginListPage);
