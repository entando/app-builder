import { connect } from 'react-redux';
import { fetchCurrentReferencePages } from 'state/groups/actions';
import { getSelectedGroupPageReferences } from 'state/groups/selectors';

import GroupDetailTabPages from 'ui/groups/detail/GroupDetailTabPages';

export const mapStateToProps = state => ({
  pageReferences: getSelectedGroupPageReferences(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchCurrentReferencePages()),
});

const GroupDetailTabPagesContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabPages);
export default GroupDetailTabPagesContainer;
