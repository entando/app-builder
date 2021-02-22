import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submit } from 'redux-form';
import GroupForm from 'ui/groups/common/GroupForm';
import { routeConverter } from '@entando/utils';
import { sendPutGroup, fetchGroup } from 'state/groups/actions';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_GROUP_LIST } from 'app-init/router';

export const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  groupCode: params.groupCode,
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  // calls post api
  onSubmit: values => dispatch(sendPutGroup(values)),
  onWillMount: ({ groupCode }) => {
    dispatch(fetchGroup(groupCode));
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('group')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_GROUP_LIST)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(GroupForm));
