import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GroupForm from 'ui/groups/common/GroupForm';
import { sendPutGroup, fetchGroup } from 'state/groups/actions';

export const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  groupCode: params.groupCode,
});

export const mapDispatchToProps = dispatch => ({
  // calls post api
  onSubmit: values => dispatch(sendPutGroup(values)),
  onWillMount: ({ groupCode }) => {
    dispatch(fetchGroup(groupCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupForm));
