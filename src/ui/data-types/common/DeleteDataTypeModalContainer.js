import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteDataType } from 'state/data-types/actions';
import DeleteDataTypeModal from 'ui/data-types/common/DeleteDataTypeModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (dataTypeCode) => {
    dispatch(sendDeleteDataType(dataTypeCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteRoleModalContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteDataTypeModal);

export default DeleteRoleModalContainer;
