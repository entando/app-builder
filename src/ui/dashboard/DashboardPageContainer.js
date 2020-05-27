import { connect } from 'react-redux';

import { getLoggedUserPermissions } from 'state/permissions/selectors';
import withPermissions from 'ui/auth/withPermissions';
import { ADMINISTRATION_AREA_PERMISSION } from 'state/permissions/const';

import DashboardPage from 'ui/dashboard/DashboardPage';

export const mapStateToProps = state => ({
  userPermissions: getLoggedUserPermissions(state),
});

const DashboardPageContainer = connect(mapStateToProps, null)(DashboardPage);

export default withPermissions(ADMINISTRATION_AREA_PERMISSION)(DashboardPageContainer);
