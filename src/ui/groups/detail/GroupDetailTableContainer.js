import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCurrentPageGroupDetail } from 'state/groups/actions';
import { getSelectedGroup } from 'state/groups/selectors';
import GroupDetailTable from 'ui/groups/detail/GroupDetailTable';

export const mapStateToProps = state => ({
  group: getSelectedGroup(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => dispatch(fetchCurrentPageGroupDetail(params.groupname)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupDetailTable));
