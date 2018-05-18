import { connect } from 'react-redux';
import { fetchReferences } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getSelectedGroupContentReferences } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';
import GroupDetailTabContents from 'ui/groups/detail/GroupDetailTabContents';
import { CONTENT_REFERENCE_KEY } from 'ui/common/references/const';

export const mapStateToProps = state => ({
  contentReferences: getSelectedGroupContentReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(fetchReferences(CONTENT_REFERENCE_KEY, page));
  },
});

const GroupDetailTabContentsContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabContents);
export default GroupDetailTabContentsContainer;
