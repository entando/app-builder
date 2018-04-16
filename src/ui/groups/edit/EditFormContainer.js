import { connect } from 'react-redux';
import GroupForm from 'ui/groups/common/GroupForm';
import { sendPutGroup, fetchGroup } from 'state/groups/actions';
import { getParams } from '@entando/router';

export const EDIT_MODE = 'edit';

export const mapStateToProps = state => ({
  mode: EDIT_MODE,
  groupCode: getParams(state).groupCode,
});

export const mapDispatchToProps = dispatch => ({
  // calls post api
  onSubmit: values => dispatch(sendPutGroup(values)),
  onWillMount: ({ groupCode }) => {
    dispatch(fetchGroup(groupCode));
  },
});

const EditFormContainer = connect(mapStateToProps, mapDispatchToProps)(GroupForm);
export default EditFormContainer;
