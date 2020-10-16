import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';

import MyProfilePage from 'ui/users/my-profile/MyProfilePage';

export const mapDispatchToProps = dispatch => ({
  onTabSelect: () => {
    dispatch(clearErrors());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(MyProfilePage);
