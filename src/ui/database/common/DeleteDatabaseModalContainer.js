import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteDatabaseBackup } from 'state/database/actions';
import DeleteDatabaseModal from 'ui/database/common/DeleteDatabaseModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (code) => {
    dispatch(sendDeleteDatabaseBackup(code));
    dispatch(setVisibleModal(''));
  },
});

const DeleteDatabaseModalContainer =
 connect(mapStateToProps, mapDispatchToProps)(DeleteDatabaseModal);

export default DeleteDatabaseModalContainer;
