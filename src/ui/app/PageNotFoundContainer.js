import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '@entando/apimanager';
import { routeConverter } from '@entando/utils';

import { ROUTE_DASHBOARD } from 'app-init/router';

import PageNotFound from 'ui/app/PageNotFound';

const mapDispatchToProps = (dispatch, { history }) => ({
  gotoLogout: () => dispatch(logoutUser()),
  gotoHomepage: () => history.push(routeConverter(ROUTE_DASHBOARD)),
});

const PageNotFoundContainer = connect(
  null,
  mapDispatchToProps,
)(PageNotFound);

export default withRouter(PageNotFoundContainer);
