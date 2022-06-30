
import { routeConverter } from '@entando/utils';
import { connect } from 'react-redux';
import NoAccess from 'ui/app/NoAccess';
import { ROUTE_DASHBOARD } from 'app-init/router';

const mapDispatchToProps = (dispatch, { history }) => ({
  gotoHomepage: () => history.push(routeConverter(ROUTE_DASHBOARD)),
});

const NoAccessPageContainer = connect(
  null,
  mapDispatchToProps,
)(NoAccess);

export default NoAccessPageContainer;
