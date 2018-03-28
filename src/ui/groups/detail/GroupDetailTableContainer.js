import { connect } from 'react-redux';
import { fetchCurrentPageGroupDetail } from 'state/groups/actions';
import { getSelectedGroup } from 'state/groups/selectors';
import GroupDetailTable from 'ui/groups/detail/GroupDetailTable';

export const mapStateToProps = state => ({
  group: getSelectedGroup(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchCurrentPageGroupDetail()),
});

const GroupDetailTableContainer = connect(mapStateToProps, mapDispatchToProps)(GroupDetailTable);

export default GroupDetailTableContainer;
