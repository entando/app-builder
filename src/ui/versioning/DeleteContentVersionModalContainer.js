import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import DeleteContentVersionModal from 'ui/versioning/DeleteContentVersionModal';
import { removeContentVersion } from 'state/versioning/actions';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (contentId, versionId) => {
    dispatch(removeContentVersion(contentId, versionId));
    dispatch(setVisibleModal(''));
  },
});

const DeleteContentVersionModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteContentVersionModal);

DeleteContentVersionModalContainer.displayName = 'DeleteContentVersionModalContainer';

export default DeleteContentVersionModalContainer;
