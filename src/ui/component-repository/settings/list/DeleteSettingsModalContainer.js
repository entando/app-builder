import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteComponentRepository } from 'state/component-repository/component-repositories/actions';
import DeleteSettingsModal from 'ui/component-repository/settings/list/DeleteSettingsModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (id) => {
    dispatch(sendDeleteComponentRepository(id));
    dispatch(setVisibleModal(''));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteSettingsModal);
