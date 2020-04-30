import { connect } from 'react-redux';
import { logoutUser, getUsername } from '@entando/apimanager';

import UserMenu from 'ui/internal-page/UserMenu';
import { clearCurrentUserAuth } from 'state/current-user-auth/actions';

export const mapStateToProps = state => ({
  username: getUsername(state),
});

export const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(clearCurrentUserAuth());
    dispatch(logoutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
