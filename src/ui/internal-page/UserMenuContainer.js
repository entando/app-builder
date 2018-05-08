import { connect } from 'react-redux';
import { logoutUser, getUsername } from '@entando/apimanager';

import UserMenu from 'ui/internal-page/UserMenu';

export const mapStateToProps = state => ({
  username: getUsername(state),
});

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
