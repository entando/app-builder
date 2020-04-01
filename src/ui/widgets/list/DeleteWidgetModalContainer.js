import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import DeleteWidgetModal from 'ui/widgets/list/DeleteWidgetModal';
import { sendDeleteWidgets } from 'state/widgets/actions';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (widgetCode) => {
    dispatch(sendDeleteWidgets(widgetCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteWidgetModalContainer =
connect(mapStateToProps, mapDispatchToProps)(DeleteWidgetModal);

export default DeleteWidgetModalContainer;
