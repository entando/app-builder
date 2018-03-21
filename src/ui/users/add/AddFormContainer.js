import { connect } from 'react-redux';
import UserForm from 'ui/users/common/UserForm';
import { fetchProfileTypes } from 'state/profile-types/actions';
import { getProfileTypesOptions } from 'state/profile-types/selectors';

export const mapStateToProps = state => ({
  profileTypes: getProfileTypesOptions(state),
});

export const mapDispatchToProps = dispatch => ({
  // calls post api
  onSubmit: values => values,
  onWillMount: () => {
    dispatch(fetchProfileTypes());
  },
});

const AddFormContainer = connect(mapStateToProps, mapDispatchToProps)(UserForm);
export default AddFormContainer;
