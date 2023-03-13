import { connect } from 'react-redux';
import { fetchPlugins } from 'state/plugins/thunks';
import { fetchUserPreferences } from 'state/user-preferences/actions';
import { getLoggedUserPermissionsLoaded } from 'state/permissions/selectors';
import { clearAppTourProgress } from 'state/app-tour/actions';
import { fetchMyGroups } from 'state/groups/actions';
import { withRouter } from 'react-router-dom';
import { getUsername } from '@entando/apimanager';
import App from 'ui/app/App';
import { fetchCurrentTenant } from 'state/multi-tenancy/actions';

export const mapStateToProps = (state, { location: { pathname } }) => ({
  username: getUsername(state),
  currentRoute: pathname,
  loggedUserPrefloading: getLoggedUserPermissionsLoaded(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchPlugins: () => dispatch(fetchPlugins()),
  fetchUserPreferences: (username) => {
    dispatch(clearAppTourProgress());
    dispatch(fetchUserPreferences(username));
    dispatch(fetchMyGroups({ sort: 'name' }));
  },
  fetchCurrentTenantInfo: () => {
    dispatch(fetchCurrentTenant());
  },
});

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default AppContainer;
