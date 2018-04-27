import { connect } from 'react-redux';
import FragmentForm from 'ui/fragments/common/FragmentForm';
import { sendPostFragment } from 'state/fragments/actions';

export const mapDispatchToProps = dispatch => ({
  onSubmit: (fragment) => {
    dispatch(sendPostFragment(fragment));
  },
});

const AddFormContainer = connect(null, mapDispatchToProps)(FragmentForm);
export default AddFormContainer;
