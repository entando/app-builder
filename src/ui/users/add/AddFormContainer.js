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
    dispatch(sendPostUser(user));
  },
  onWillMount: () => {
    dispatch(fetchProfileTypes({ page: 1, pageSize: 0 }));
  },
});

const AddFormContainer = connect(mapStateToProps, mapDispatchToProps)(UserForm);
export default AddFormContainer;
