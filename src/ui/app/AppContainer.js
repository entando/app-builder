import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsername } from '@entando/apimanager';

import App from 'ui/app/App';

// map the props
export const mapStateToProps = (state, { location: { pathname } }) => ({
  username: getUsername(state),
  currentRoute: pathname,
});

// connect the component
const AppContainer = withRouter(connect(mapStateToProps, null)(App));

// export connected component (Container)
export default AppContainer;
