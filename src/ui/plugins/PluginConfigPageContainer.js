
import { connect } from 'react-redux';
import { getSelectedPlugin } from 'state/plugins/selectors';
import { getOrFetchPlugin, savePluginConfig } from 'state/plugins/thunks';
import PluginConfigPage from 'ui/plugins/PluginConfigPage';

export const mapStateToProps = state => ({
  plugin: getSelectedPlugin(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  getOrFetchPlugin: () => dispatch(getOrFetchPlugin(params.id)),
  savePluginConfig: config => dispatch(savePluginConfig(config)),
});

const PluginConfigPageContainer = connect(mapStateToProps, mapDispatchToProps)(PluginConfigPage);

export default PluginConfigPageContainer;
