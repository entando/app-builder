import { connect } from 'react-redux';
import { fetchCurrentReferenceWidgetTypes } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getSelectedGroupWidgetTypeReferences } from 'state/groups/selectors';

import GroupDetailTabWidgetTypes from 'ui/groups/detail/GroupDetailTabWidgetTypes';

export const mapStateToProps = state => ({
  pageReferences: getSelectedGroupWidgetTypeReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCurrentReferenceWidgetTypes());
  },
});

const GroupDetailTabUsersContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabWidgetTypes);
export default GroupDetailTabUsersContainer;
