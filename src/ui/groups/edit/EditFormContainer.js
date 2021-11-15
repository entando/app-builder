import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import GroupForm from 'ui/groups/common/GroupForm';
import { sendPutGroup, fetchGroup, clearSelectedGroup } from 'state/groups/actions';
import { DEFAULT_FORM_VALUES } from 'state/groups/const';
import { getSelectedGroup } from 'state/groups/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_GROUP_LIST } from 'app-init/router';

export const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  groupCode: params.groupCode,
  initialValues: getSelectedGroup(state) || DEFAULT_FORM_VALUES,
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onSubmit: values => dispatch(sendPutGroup(values)),
  onDidMount: ({ groupCode }) => {
    dispatch(fetchGroup(groupCode));
  },
  onWillUnmount: () => {
    dispatch(clearSelectedGroup());
  },
  onHideCancelModal: () => dispatch(setVisibleModal('')),
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_GROUP_LIST)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(GroupForm));
