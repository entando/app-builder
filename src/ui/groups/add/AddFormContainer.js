import { connect } from 'react-redux';
import { routeConverter } from '@entando/utils';
import GroupForm from 'ui/groups/common/GroupForm';
import { change, touch, submit } from 'redux-form';
import { sendPostGroup } from 'state/groups/actions';
import { withRouter } from 'react-router-dom';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_GROUP_LIST } from 'app-init/router';

export const mapDispatchToProps = (dispatch, { history }) => ({
  // calls post api
  onSubmit: values => dispatch(sendPostGroup(values)),
  onChangeName: (name) => {
    dispatch(change('group', 'code', name.replace(/\W/g, '_').toLowerCase()));
    dispatch(touch('group', 'code'));
  },
  onFocus: (name) => {
    dispatch(touch('group', name));
  },
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('group')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_GROUP_LIST)); },
});

const AddFormContainer = connect(null, mapDispatchToProps, null, {
  pure: false,
})(GroupForm);

export default withRouter(AddFormContainer);
