import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserAuthorityPage from 'ui/users/authority/UserAuthorityPage';

export const mapStateToProps = (state, { match: { params } }) =>
  ({
    username: params.username,
  });

export default withRouter(connect(mapStateToProps, null)(UserAuthorityPage));
