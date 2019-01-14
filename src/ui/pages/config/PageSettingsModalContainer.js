import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import PageSettingsModal from 'ui/pages/config/PageSettingsModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onSave: () => {
    dispatch(setVisibleModal(''));
  },
});

const PageSettingsModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSettingsModal);

export default PageSettingsModalContainer;
