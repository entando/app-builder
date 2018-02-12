
import { connect } from 'react-redux';

import App from 'ui/app/App';

// map the props
export const mapStateToProps = state => ({
  route: state.router.route,
});

// connect the component
const AppContainer = connect(mapStateToProps, null)(App);

// export connected component (Container)
export default AppContainer;
