import { connect } from 'react-redux';
import UserAuthorityPage from 'ui/users/authority/UserAuthorityPage';
import { getParams } from '@entando/router';

export const mapStateToProps = state =>
  ({
    username: getParams(state).username,
  });

const UserAuthorityPageContainer =
connect(mapStateToProps, null)(UserAuthorityPage);
export default UserAuthorityPageContainer;
