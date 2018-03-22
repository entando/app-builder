import { connect } from 'react-redux';
import { fetchGroup } from 'state/groups/actions';
import { getSelectedGroup } from 'state/groups/selectors';
import { getParams } from 'frontend-common-components';

import GroupDetailTable from 'ui/groups/detail/GroupDetailTable';

export const mapStateToProps = state => ({
  group: getSelectedGroup(state),
  groupname: getParams(state).groupname,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: groupname => dispatch(fetchGroup(groupname)),
});

const GroupDetailTableContainer = connect(mapStateToProps, mapDispatchToProps)(GroupDetailTable);

export default GroupDetailTableContainer;
