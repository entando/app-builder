import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsername } from '@entando/apimanager';
import App from 'ui/app/App';

export const mapStateToProps = (state, { location: { pathname } }) => ({
  username: getUsername(state),
  currentRoute: pathname,
});

const AppContainer = withRouter(connect(mapStateToProps, null)(App));

export default AppContainer;
