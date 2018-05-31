import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteDataModel } from 'state/data-models/actions';
import DeleteDataModelModal from 'ui/data-models/common/DeleteDataModelModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (dataModelCode) => {
    dispatch(sendDeleteDataModel(dataModelCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteDataModelModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDataModelModal);

export default DeleteDataModelModalContainer;
