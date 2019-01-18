import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import PageSettingsModal from 'ui/pages/config/PageSettingsModal';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  onSave: () => {
    dispatch(setVisibleModal(''));
  },
  onCancel: () => {
    dispatch(setVisibleModal(''));
  },
});

const PageSettingsModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSettingsModal);

export default PageSettingsModalContainer;
