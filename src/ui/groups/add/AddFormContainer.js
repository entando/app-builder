import { connect } from 'react-redux';
import { routeConverter } from '@entando/utils';
import GroupForm from 'ui/groups/common/GroupForm';
import { sendPostGroup } from 'state/groups/actions';
import { DEFAULT_FORM_VALUES } from 'state/groups/const';
import { withRouter } from 'react-router-dom';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_GROUP_LIST } from 'app-init/router';

export const mapStateToProps = () => ({
  initialValues: DEFAULT_FORM_VALUES,
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onSubmit: values => dispatch(sendPostGroup(values)),
  onHideCancelModal: () => dispatch(setVisibleModal('')),
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_GROUP_LIST)); },
});

const AddFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(GroupForm);

export default withRouter(AddFormContainer);
