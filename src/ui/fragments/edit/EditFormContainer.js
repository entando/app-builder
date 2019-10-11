import { connect } from 'react-redux';

import FragmentForm from 'ui/fragments/common/FragmentForm';
import { sendPutFragment } from 'state/fragments/actions';

export const EDIT_MODE = 'edit';

export const mapStateToProps = () => (
  {
    mode: EDIT_MODE,
  });


export const mapDispatchToProps = dispatch => ({
  onSubmit: (fragment) => {
    dispatch(sendPutFragment(fragment));
  },
});


export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(FragmentForm);
