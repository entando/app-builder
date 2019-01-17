import { isValid, isSubmitting, submit } from 'redux-form';
import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import PageSettingsModal from 'ui/pages/config/PageSettingsModal';
import { FORM_ID } from 'ui/pages/config/PageSettingsForm';

const mapStateToProps = state => ({
  canSave: isValid(FORM_ID)(state) && !isSubmitting(FORM_ID)(state),
});

const mapDispatchToProps = dispatch => ({
  onSave: () => {
    dispatch(submit(FORM_ID));
    dispatch(setVisibleModal(''));
  },
});

const PageSettingsModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSettingsModal);

export default PageSettingsModalContainer;
