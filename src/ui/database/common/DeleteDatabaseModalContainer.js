import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import DeleteDatabaseModal from 'ui/database/common/DeleteDatabaseModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: () => {
    // TODO:  dispatch the action delete
    dispatch(setVisibleModal(''));
  },
});

const DeleteDatabaseModalContainer =
 connect(mapStateToProps, mapDispatchToProps)(DeleteDatabaseModal);

export default DeleteDatabaseModalContainer;
