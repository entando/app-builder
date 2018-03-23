import { connect } from 'react-redux';
import DeleteModal from 'ui/common/modal/DeleteModal';

export const mapStateToProps = () => ({
  isVisible: '',
  modalTitle: '',
  code: '',
  type: '',
});

export const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(() => {}),
});

const DeleteModalContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteModal);

export default DeleteModalContainer;
