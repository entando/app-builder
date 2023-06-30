import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeletePage } from 'state/pages/actions';
import DeletePageModal from 'ui/pages/common/DeletePageModal';
import { getPagesMap } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  info: getInfo(state),
  page: getInfo(state).page || getPagesMap(state)[getInfo(state).code],
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (page, successRedirect) => {
    dispatch(sendDeletePage({ ...page, redirectToPageTree: true }, successRedirect));
    dispatch(setVisibleModal(''));
  },
});

const DeletePageModalContainer = connect(mapStateToProps, mapDispatchToProps)(DeletePageModal);

export default DeletePageModalContainer;
