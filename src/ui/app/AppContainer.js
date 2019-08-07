import { connect } from 'react-redux';
import { fetchPlugins } from 'state/plugins/thunks';
import { withRouter } from 'react-router-dom';
import { getUsername } from '@entando/apimanager';
import App from 'ui/app/App';

export const mapStateToProps = (state, { location: { pathname } }) => ({
  username: getUsername(state),
  currentRoute: pathname,
});

export const mapDispatchToProps = dispatch => ({
  fetchPlugins: () => dispatch(fetchPlugins()),
});

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default AppContainer;
