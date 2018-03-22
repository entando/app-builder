import { connect } from 'react-redux';
import { fetchGroup } from 'state/groups/actions';
import { getSelectedGroup } from 'state/groups/selectors';

import GroupDetailTable from 'ui/groups/detail/GroupDetailTable';

export const mapStateToProps = state => ({
  group: getSelectedGroup(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: groupname => dispatch(fetchGroup(groupname)),
});

const GroupDetailTableContainer = connect(null, mapDispatchToProps)(GroupDetailTable);

export default GroupDetailTableContainer;
