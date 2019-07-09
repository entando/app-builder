import { connect } from 'react-redux';
import { fetchPlugins } from 'state/plugins/thunks';
import { getUsername } from '@entando/apimanager';
import { getRoute } from '@entando/router';

import App from 'ui/app/App';

export const mapStateToProps = state => ({
  route: getRoute(state),
  username: getUsername(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchPlugins: () => dispatch(fetchPlugins()),
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
