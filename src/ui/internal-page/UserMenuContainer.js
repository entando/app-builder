import { connect } from 'react-redux';
import { logoutUser, getUsername } from '@entando/apimanager';

import UserMenu from 'ui/internal-page/UserMenu';
import { dismissedWizardKey } from 'ui/app-tour/constant';

export const mapStateToProps = state => ({
  username: getUsername(state),
});

export const mapDispatchToProps = dispatch => ({
  logout: () => {
    sessionStorage.removeItem(dismissedWizardKey);
    dispatch(logoutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
