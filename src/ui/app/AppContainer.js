
import { connect } from 'react-redux';

import { getRoute } from 'frontend-common-components';
import { getUsername } from 'state/current-user/selectors';
import App from 'ui/app/App';

// map the props
export const mapStateToProps = state => ({
  route: getRoute(state),
  username: getUsername(state),
});

// connect the component
const AppContainer = connect(mapStateToProps, null)(App);

// export connected component (Container)
export default AppContainer;
