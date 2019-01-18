import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import SinglePageSettingsModal from 'ui/pages/config/SinglePageSettingsModal';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  onSave: () => {
    dispatch(setVisibleModal(''));
  },
  onCancel: () => {
    dispatch(setVisibleModal(''));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SinglePageSettingsModal);
