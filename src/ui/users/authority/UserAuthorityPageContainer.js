import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserAuthorityPage from 'ui/users/authority/UserAuthorityPage';
import withPermissions from 'ui/auth/withPermissions';
import { CRUD_USERS_PERMISSION } from 'state/permissions/const';

export const mapStateToProps = (state, { match: { params } }) =>
  ({
    username: params.username,
  });

const UserAuthorityPageContainer =
connect(mapStateToProps, null)(withPermissions(CRUD_USERS_PERMISSION)(UserAuthorityPage));

export default withRouter(UserAuthorityPageContainer);
