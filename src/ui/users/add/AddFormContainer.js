import { connect } from 'react-redux';
import UserForm from 'ui/users/common/UserForm';
import { fetchProfileTypes } from 'state/profile-types/actions';
import { getProfileTypesOptions } from 'state/profile-types/selectors';
import { sendPostUser } from 'state/users/actions';

export const mapStateToProps = state => ({
  profileTypes: getProfileTypesOptions(state),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (user) => {
    const { saveType } = user;
    dispatch(sendPostUser(user, saveType === 'editProfile'));
  },
  onWillMount: () => {
    dispatch(fetchProfileTypes({ page: 1, pageSize: 0 }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UserForm);
